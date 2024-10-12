package com.fluchtens.stats.core;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fluchtens.stats.account.Account;
import com.fluchtens.stats.account.AccountRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import nl.basjes.parse.useragent.UserAgent;
import nl.basjes.parse.useragent.UserAgentAnalyzer;


@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private JSONObject user;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpSession session;

    private final UserAgentAnalyzer userAgentAnalyzer = UserAgentAnalyzer.newBuilder().build();

    private void setSessionAttributes() {
        String ip = request.getRemoteAddr();
        session.setAttribute("ip", ip);

        String userAgentString = request.getHeader("User-Agent");
        UserAgent userAgent = userAgentAnalyzer.parse(userAgentString);
        session.setAttribute("browser", userAgent.getValue("AgentName"));
        session.setAttribute("os", userAgent.getValue("OperatingSystemName"));
        session.setAttribute("device", userAgent.getValue("DeviceName"));
    }

    private int getId() {
        return this.user.getInt("id");
    }

    private String getEmail() {
        return this.user.getString("email");
    }

    private String getLogin() {
        return this.user.getString("login");
    }

    private String getImage() {
        String imageLink = null;
        JSONObject image = this.user.getJSONObject("image");
        if (!image.isNull("link")) {
            imageLink = image.getString("link");
        }
        return imageLink;
    }

    private double getLevel() {
        double level = 0;
        JSONArray cursusUsers = this.user.getJSONArray("cursus_users");
        for (int i = 0; i < cursusUsers.length(); i++) {
            JSONObject cursusUser = cursusUsers.getJSONObject(i);
            int cursusId = cursusUser.getInt("cursus_id");

            if (cursusId == 21) {
                level = cursusUser.getDouble("level");
                break;
            }
        }
        return level;
    }

    private int getCampusId() {
        int campusId = 0;
        JSONArray campuses = this.user.getJSONArray("campus_users");
        for (int i = 0; i < campuses.length(); i++) {
            JSONObject campusUser = campuses.getJSONObject(i);
            boolean isPrimary = campusUser.getBoolean("is_primary");

            if (isPrimary == true) {
                campusId = campusUser.getInt("campus_id");
                break;
            }
        }
        return campusId;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        JSONObject userObject = new JSONObject(attributes);
        this.user = userObject;

        this.setSessionAttributes();

        // Map<String, Object> attributes = oauth2User.getAttributes();
        // System.out.println("Attributs OAuth2User : ");
        // for (Map.Entry<String, Object> entry : attributes.entrySet()) {
        //     System.out.println(entry.getKey() + ": " + entry.getValue());
        // }

        int id = this.getId();
        String email = this.getEmail();
        String login = this.getLogin();
        String image = this.getImage();
        double level = this.getLevel();
        int campusId = this.getCampusId();

        Optional<Account> existingUser = accountRepository.findById(id);
        if (existingUser.isPresent()) {
            Account user = existingUser.get();
            user.setId(id);
            user.setEmail(email);
            user.setLogin(login);
            user.setImage(image);
            user.setLevel(level);
            user.setCampusId(campusId);
            user.setUpdatedAt(LocalDateTime.now());
            if (user.isValid()) {
                accountRepository.save(user);
            }
        } else {
            Account user = new Account(id, email, login , image, level, campusId, LocalDateTime.now(), LocalDateTime.now());
            if (user.isValid()) {
                accountRepository.save(user);
            }
        }

        return oAuth2User;
    }
}
