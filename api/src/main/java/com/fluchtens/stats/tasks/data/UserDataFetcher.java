package com.fluchtens.stats.tasks.data;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fluchtens.stats.models.Campus;
import com.fluchtens.stats.models.User;
import com.fluchtens.stats.repositories.UserRepository;

@Component
public class UserDataFetcher extends DataFetcher {
    @Autowired
    private UserRepository userRepository;

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

        System.out.println(CYAN + "[UserDataFetcher]" + WHITE + " [" + formattedTime + "] " + TEXT + message + RESET);
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

    protected void fetchAllCampusUsers(Campus campus) {
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
}
