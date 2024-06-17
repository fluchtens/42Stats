package com.fluchtens.stats.services;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.fluchtens.stats.models.User;
import com.fluchtens.stats.repositories.UserRepository;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oauth2User = super.loadUser(userRequest);

        int id = oauth2User.getAttribute("id");
        String email = oauth2User.getAttribute("email");
        String login = oauth2User.getAttribute("login");
        Map<String, Object> imageAttributes = oauth2User.getAttribute("image");
        String image = null;
        if (imageAttributes != null) {
            image = (String) imageAttributes.get("link");
        }

        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setId(id);
            user.setEmail(email);
            user.setLogin(login);
            user.setImage(image);
            user.setUpdatedAt(LocalDateTime.now());
            if (user.isValid()) {
                userRepository.save(user);
            }
        } else {
            User user = new User();
            user.setId(id);
            user.setEmail(email);
            user.setLogin(login);
            user.setImage(image);
            user.setCreatedAt(LocalDateTime.now());
            user.setUpdatedAt(LocalDateTime.now());
            if (user.isValid()) {
                userRepository.save(user);
            }
        }

        return oauth2User;
    }
}
