package com.fluchtens.stats.services;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fluchtens.stats.models.Account;
import com.fluchtens.stats.repositories.AccountRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private HttpSession session;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String ipAddress = request.getRemoteAddr();
        session.setAttribute("IP_ADDRESS", ipAddress);
        System.out.println("IP_ADDRESS: " + session.getAttribute("IP_ADDRESS"));

        String userAgent = request.getHeader("User-Agent");
        session.setAttribute("USER_AGENT", userAgent);
        System.out.println("USER_AGENT: " + session.getAttribute("USER_AGENT"));

        // Map<String, Object> attributes = oauth2User.getAttributes();
        // System.out.println("All attributes:");
        // for (Map.Entry<String, Object> entry : attributes.entrySet()) {
        //     System.out.println(entry.getKey() + " : " + entry.getValue());
        // }

        int id = oauth2User.getAttribute("id");
        String email = oauth2User.getAttribute("email");
        String login = oauth2User.getAttribute("login");
        Map<String, Object> imageAttributes = oauth2User.getAttribute("image");
        String image = null;
        if (imageAttributes != null) {
            image = (String) imageAttributes.get("link");
        }

        Optional<Account> existingUser = accountRepository.findById(id);
        if (existingUser.isPresent()) {
            Account user = existingUser.get();
            user.setId(id);
            user.setEmail(email);
            user.setLogin(login);
            user.setImage(image);
            user.setUpdatedAt(LocalDateTime.now());
            if (user.isValid()) {
                accountRepository.save(user);
            }
        } else {
            Account user = new Account();
            user.setId(id);
            user.setEmail(email);
            user.setLogin(login);
            user.setImage(image);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            if (user.isValid()) {
                accountRepository.save(user);
            }
        }

        return oauth2User;
    }
}
