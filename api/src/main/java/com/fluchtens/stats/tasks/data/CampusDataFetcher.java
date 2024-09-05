package com.fluchtens.stats.tasks.data;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fluchtens.stats.models.Campus;
import com.fluchtens.stats.repositories.CampusRepository;
import com.fluchtens.stats.repositories.UserRepository;

@Component
public class CampusDataFetcher extends DataFetcher {
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserDataFetcher userDataFetcher;

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

        System.out.println(CYAN + "[CampusDataFetcher]" + WHITE + " [" + formattedTime + "] " + TEXT + message + RESET);
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

    protected void fetchAllCampuses() {
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

                this.userDataFetcher.fetchAllCampusUsers(campus);
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
}