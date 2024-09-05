package com.fluchtens.stats.tasks.data;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fluchtens.stats.repositories.CampusRepository;
import com.fluchtens.stats.repositories.UserRepository;

@Component
public class DataFetcher {
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private UserRepository userRepository;

    protected String apiUrl = "https://api.intra.42.fr/v2";
    protected String accessToken;

    @Value("${spring.security.oauth2.client.registration.42.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.42.client-secret}")
    private String clientSecret;

    @Autowired
    @Lazy
    private CampusDataFetcher campusDataFetcher;

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
            System.err.println("[fetchAccessToken] catched exception" + e.getMessage());
            return null;
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
        this.campusDataFetcher.fetchAllCampuses();

        LocalDateTime endTime = LocalDateTime.now();
        String formattedEndTime = endTime.format(formatter);
        System.out.println("[" + formattedEndTime + "] End of 42 api fetching.");
    }
}
