package com.fluchtens.stats.tasks.data;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
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
                System.err.println("[fetchCampusUsersPage] An error occurred while retrieving data, retry in 15 seconds...");
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
            System.err.println("[fetchCampusUsersPage] catched exception" + e.getMessage());
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
