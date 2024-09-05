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

    @Autowired
    @Lazy
    private CampusDataFetcher campusDataFetcher;

    @Autowired
    @Lazy
    private UserDataFetcher userDataFetcher;

    @Autowired
    @Lazy
    private ProjectDataFetcher projectDataFetcher;

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

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

    @Scheduled(fixedRate = 24 * 60 * 60 * 1000)
    public void fetchData() throws IOException {
        this.print("Start scrapping data from api.intra.42.fr", false);

        this.accessToken = this.fetchAccessToken();
        this.campusDataFetcher.setAccessToken(this.accessToken);
        this.userDataFetcher.setAccessToken(this.accessToken);
        this.projectDataFetcher.setAccessToken(this.accessToken);
        if (this.accessToken.isEmpty()) {
            this.print("Failed to fetch access token.", true);
            return;
        }

        this.userRepository.deleteAll();
        this.campusRepository.deleteAll();
        this.projectRepository.deleteAll();

        this.campusDataFetcher.fetchAllCampuses();
        this.projectDataFetcher.fetchAllProjects();

        this.print("End of data scrapping from api.intra.42.fr", false);
    }
}
