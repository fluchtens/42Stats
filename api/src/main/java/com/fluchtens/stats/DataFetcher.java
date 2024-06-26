package com.fluchtens.stats;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fluchtens.stats.models.Campus;
import com.fluchtens.stats.models.User;
import com.fluchtens.stats.repositories.CampusRepository;
import com.fluchtens.stats.repositories.UserRepository;

@Component
public class DataFetcher {
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private UserRepository userRepository;

    private String apiUrl = "https://api.intra.42.fr/v2";
    private String accessToken;

    @Value("${spring.security.oauth2.client.registration.42.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.42.client-secret}")
    private String clientSecret;

    private String fetchAccessToken() {
        try {
            URL url = new URL("https://api.intra.42.fr/oauth/token");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("POST");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setDoOutput(true);
        
            String fortyTwoClient = this.clientId;
            String fortyTwoSecret = this.clientSecret;
            JSONObject requestBody = new JSONObject();
            requestBody.put("grant_type", "client_credentials");
            requestBody.put("client_id", fortyTwoClient);
            requestBody.put("client_secret", fortyTwoSecret);
            byte[] postData = requestBody.toString().getBytes(StandardCharsets.UTF_8);
            
            DataOutputStream dos = new DataOutputStream(connection.getOutputStream());
            dos.write(postData);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                return "";
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
            System.err.println("[fetchAccessToken] catched exception" + e.getMessage());
            return "";
        }
    }

    private JSONArray fetchCampusesPage(int page) {
        try {
            String apiUrl = String.format("https://api.intra.42.fr/v2/campus?page=%d&?page[size]=100", page);
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.accessToken);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                System.err.println("[fetchCampusesPage] An error occurred while retrieving data, retry in 15 seconds...");
                Thread.sleep(15 * 1000);
                return this.fetchCampusesPage(page);
            } else {
                StringBuilder response = new StringBuilder();
                BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                while ((line = bf.readLine()) != null) {
                    response.append(line);
                }
                bf.close();
                return new JSONArray(response.toString());
            }
        } catch (Exception e) {
            System.err.println("[fetchCampusesPage] catched exception" + e.getMessage());
            return new JSONArray();
        }
    }

    private JSONArray fetchCampusUsersPage(int campusId, int page) {
        try {
            String apiUrl = String.format(this.apiUrl + "/cursus_users?filter[cursus_id]=21&filter[campus_id]=%s&page[number]=%d&page[size]=100", campusId, page);
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestProperty("Authorization", "Bearer " + this.accessToken);

            if (connection.getResponseCode() != HttpURLConnection.HTTP_OK) {
                System.err.println("[fetchCampusUsersPage] An error occurred while retrieving data, retry in 15 seconds...");
                Thread.sleep(15 * 1000);
                return this.fetchCampusUsersPage(campusId, page);
            } else {
                StringBuilder response = new StringBuilder();
                BufferedReader bf = new BufferedReader(new InputStreamReader(connection.getInputStream()));
                String line;
                while ((line = bf.readLine()) != null) {
                    response.append(line);
                }
                bf.close();
                return new JSONArray(response.toString());
            }
        } catch (Exception e) {
            System.err.println("[fetchCampusUsersPage] catched exception" + e.getMessage());
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
                User user = new User();
                user.setId(userJson.getJSONObject("user").getInt("id"));
                user.setEmail(userJson.getJSONObject("user").getString("email"));
                user.setLogin(userJson.getJSONObject("user").getString("login"));
                user.setFirstName(userJson.getJSONObject("user").getString("first_name"));
                user.setLastName(userJson.getJSONObject("user").getString("last_name"));
                if (!userJson.getJSONObject("user").getJSONObject("image").isNull("link")) {
                    user.setImage(userJson.getJSONObject("user").getJSONObject("image").getString("link"));
                }
                if (!userJson.getJSONObject("user").isNull("pool_month")) {
                    user.setPoolMonth(userJson.getJSONObject("user").getString("pool_month"));
                }
                if (!userJson.getJSONObject("user").isNull("pool_year")) {
                    user.setPoolYear(userJson.getJSONObject("user").getString("pool_year"));
                }
                user.setLevel(userJson.getDouble("level"));
                user.setCampus(campus);

                if (user.isValid()) {
                    userRepository.save(user);
                }
            }
            page++;
        }
    }

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void fetchData() throws IOException {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime startTime = LocalDateTime.now();
        String formattedStartTime = startTime.format(formatter);
        System.out.println("[" + formattedStartTime + "] Start of 42 api fetching...");

        this.accessToken = this.fetchAccessToken();
        if (this.accessToken.isEmpty()) {
            System.err.println("Failed to fetch access token.");
            return;
        }

        userRepository.deleteAll();
        campusRepository.deleteAll();
        this.fetchAllCampuses();

        LocalDateTime endTime = LocalDateTime.now();
        String formattedEndTime = endTime.format(formatter);
        System.out.println("[" + formattedEndTime + "] End of 42 api fetching.");
    }
}
