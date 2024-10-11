package com.fluchtens.stats.tasks;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fluchtens.stats.models.Campus;
import com.fluchtens.stats.models.Project;
import com.fluchtens.stats.models.User;
import com.fluchtens.stats.repositories.CampusRepository;
import com.fluchtens.stats.repositories.ProjectRepository;
import com.fluchtens.stats.repositories.UserRepository;

@Component
public class DataFetcher {
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProjectRepository projectRepository;

    protected String apiUrl = "https://api.intra.42.fr/v2";

    protected String accessToken;

    @Value("${spring.security.oauth2.client.registration.42.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.42.client-secret}")
    private String clientSecret;

    private void print(String message, boolean error) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime time = LocalDateTime.now();
        String formattedTime = time.format(formatter);

        String CYAN = "\033[1;36m";
        String RED = "\033[0;31m";
        String GREEN = "\033[0;32m";
        String RESET = "\033[0m";
        String WHITE = "\u001B[37m";

        String TEXT = GREEN;
        if (error) {
            TEXT = RED;
        }

        System.out.println(CYAN + "[DataFetcher]" + WHITE + " [" + formattedTime + "] " + TEXT + message + RESET);
    }

    private String fetchAccessToken() {
        try {
            URI uri = new URI("https://api.intra.42.fr/oauth/token");
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);

            JSONObject requestBody = new JSONObject();
            requestBody.put("grant_type", "client_credentials");
            requestBody.put("client_id", this.clientId);
            requestBody.put("client_secret", this.clientSecret);
            byte[] postData = requestBody.toString().getBytes(StandardCharsets.UTF_8);
            
            DataOutputStream dos = new DataOutputStream(connection.getOutputStream());
            dos.write(postData);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                return null;
            }

            StringBuilder response = new StringBuilder();
            BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = bf.readLine()) != null) {
                response.append(line);
            }

            String strResponse = response.toString();
            JSONObject jsonResponse = new JSONObject(strResponse);
            return jsonResponse.getString("access_token");
        } catch (Exception e) {
            this.print("fetchAccessToken() catched exception" + e.getMessage(), true);
            return null;
        }
    }

    private JSONArray fetchCampusesPage(int page) {
        try {
            String apiUrl = String.format(this.apiUrl + "/campus?page=%d&?page[size]=100", page);
            URI uri = new URI(apiUrl);
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.accessToken);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                this.print(connection.getResponseCode() + " " + connection.getResponseMessage() + ", retry in 15 seconds...", true);
                Thread.sleep(15 * 1000);
                if (connection.getResponseCode() == HttpURLConnection.HTTP_UNAUTHORIZED) {
                    this.accessToken = this.fetchAccessToken();
                }
                return this.fetchCampusesPage(page);
            }

            StringBuilder response = new StringBuilder();
            BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = bf.readLine()) != null) {
                response.append(line);
            }
            bf.close();
            return new JSONArray(response.toString());
        } catch (Exception e) {
            this.print("fetchCampusesPage() catched exception" + e.getMessage(), true);
            return new JSONArray();
        }
    }

    private void fetchAllCampuses() {
        int page = 1;

        while (true) {
            JSONArray campusesJson = this.fetchCampusesPage(page);
            if (campusesJson.length() <= 0) {
                break;
            }

            for (int i = 0; i < campusesJson.length(); i++) {
                JSONObject campusJson = campusesJson.getJSONObject(i);
                Campus campus = new Campus();
                campus.setId(campusJson.getInt("id"));
                campus.setName(campusJson.getString("name"));
                campus.setCountry(campusJson.getString("country"));
                campus.setUserCount(campusJson.getInt("users_count"));
                campus.setStudentCount(0);
                campus.setAverageLevel(0.0);
                campusRepository.save(campus);

                this.fetchAllCampusUsers(campus);
                int userCount = this.userRepository.countByCampus(campus.getId());
                campus.setStudentCount(userCount);
                Double averageLevel = this.userRepository.findAverageLevelByCampus(campus.getId());
                if (averageLevel != null && averageLevel != 0) {
                    campus.setAverageLevel(Math.round(averageLevel * 100.0) / 100.0);
                } else {
                    campus.setAverageLevel(0.0);
                }
                campusRepository.save(campus);
            }
            page++;
        }
    }

    private JSONArray fetchCampusUsersPage(int campusId, int page) {
        try {
            String apiUrl = String.format(this.apiUrl + "/cursus_users?filter[cursus_id]=21&filter[campus_id]=%s&page[number]=%d&page[size]=100", campusId, page);
            URI uri = new URI(apiUrl);
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.accessToken);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                this.print(connection.getResponseCode() + " " + connection.getResponseMessage() + ", retry in 15 seconds...", true);
                Thread.sleep(15 * 1000);
                if (connection.getResponseCode() == HttpURLConnection.HTTP_UNAUTHORIZED) {
                    this.accessToken = this.fetchAccessToken();
                }
                return this.fetchCampusUsersPage(campusId, page);
            }

            StringBuilder response = new StringBuilder();
            BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = bf.readLine()) != null) {
                response.append(line);
            }
            bf.close();
            return new JSONArray(response.toString());
        } catch (Exception e) {
            this.print("fetchCampusUsersPage() catched exception" + e.getMessage(), true);
            return new JSONArray();
        }
    }

    private void fetchAllCampusUsers(Campus campus) {
        int campusId = campus.getId();
        int page = 1;

        while (true) {
            JSONArray usersJson = this.fetchCampusUsersPage(campusId, page);
            if (usersJson.length() <= 0) {
                break;
            }

            for (int i = 0; i < usersJson.length(); i++) {
                JSONObject userJson = usersJson.getJSONObject(i);
                JSONObject userObj = userJson.getJSONObject("user");
                if (userObj.getBoolean("staff?") == true) {
                    continue;
                }

                User user = new User();
                user.setId(userObj.getInt("id"));
                user.setEmail(userObj.getString("email"));
                user.setLogin(userObj.getString("login"));
                user.setFirstName(userObj.getString("first_name"));
                user.setLastName(userObj.getString("last_name"));
                if (!userObj.getJSONObject("image").isNull("link")) {
                    user.setImage(userObj.getJSONObject("image").getString("link"));
                }
                if (!userObj.isNull("pool_month")) {
                    user.setPoolMonth(userObj.getString("pool_month"));
                }
                if (!userObj.isNull("pool_year")) {
                    user.setPoolYear(userObj.getString("pool_year"));
                }
                user.setLevel(userJson.getDouble("level"));
                if (!userJson.isNull("end_at") && userObj.getBoolean("alumni?") != true) {
                    String blackholedAtStr = userJson.getString("end_at");
                    ZonedDateTime blackholedAt = ZonedDateTime.parse(blackholedAtStr, DateTimeFormatter.ISO_ZONED_DATE_TIME);
                    if (blackholedAt.isBefore(ZonedDateTime.now())) {
                        user.setBlackholed(true);
                    }
                }
                user.setCampus(campus);

                if (user.isValid()) {
                    userRepository.save(user);
                }
            }
            page++;
        }
    }

    private JSONArray fetchProjectsPage(int page) {
        try {
            String apiUrl = String.format(this.apiUrl + "/projects?page[number]=%d&page[size]=100&cursus_id=21&sort=id", page);
            URI uri = new URI(apiUrl);
            URL url = uri.toURL();

            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.accessToken);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                this.print(connection.getResponseCode() + " " + connection.getResponseMessage() + ", retry in 15 seconds...", true);
                Thread.sleep(15 * 1000);
                if (connection.getResponseCode() == HttpURLConnection.HTTP_UNAUTHORIZED) {
                    this.accessToken = this.fetchAccessToken();
                }
                return this.fetchProjectsPage(page);
            }

            StringBuilder response = new StringBuilder();
            BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line;
            while ((line = bf.readLine()) != null) {
                response.append(line);
            }
            bf.close();
            return new JSONArray(response.toString());
        } catch (Exception e) {
            this.print("fetchProjectsPage() catched exception" + e.getMessage(), true);
            return new JSONArray();
        }
    }

    private void fetchAllProjects() {
        int page = 1;

        while (true) {
            JSONArray projectsJson = this.fetchProjectsPage(page);
            if (projectsJson.length() <= 0) {
                break;
            }

            for (int i = 0; i < projectsJson.length(); i++) {
                JSONObject projectJson = projectsJson.getJSONObject(i);

                int id = -1;
                String name = null;
                String slug = null;
                int difficulty = -1;

                if (!projectJson.isNull("id")) 
                    id = projectJson.getInt("id");
                if (!projectJson.isNull("name")) 
                    name = projectJson.getString("name");
                if (!projectJson.isNull("slug")) 
                    slug = projectJson.getString("slug");
                if (!projectJson.isNull("difficulty")) 
                    difficulty = projectJson.getInt("difficulty");

                if (id <= 0 || name == null || slug == null || difficulty <= 0) {
                    continue;
                }
                if (this.projectRepository.existsById(id) || this.projectRepository.existsBySlug(slug) || this.projectRepository.existsByName(name)) {
                    System.out.println("Project already exists: " + name);
                    continue;
                }

                Project project = new Project();
                project.setId(id);
                project.setName(name);
                project.setSlug(slug);
                project.setDifficulty(difficulty);
                this.projectRepository.save(project);
            }
            page++;
        }
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void fetchData() throws IOException {
        this.print("Start scrapping data from api.intra.42.fr", false);

        this.accessToken = this.fetchAccessToken();
        if (this.accessToken == null || this.accessToken.isEmpty()) {
            this.print("Failed to fetch access token.", true);
            return;
        }

        this.userRepository.deleteAll();
        this.campusRepository.deleteAll();
        this.projectRepository.deleteAll();

        this.fetchAllProjects();
        this.fetchAllCampuses();

        this.print("End of data scrapping from api.intra.42.fr", false);
    }
}
