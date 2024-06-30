package com.fluchtens.stats.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.FortyTwoUser;
import com.fluchtens.stats.models.User;
import com.fluchtens.stats.repositories.FortyTwoUserRepository;
import com.fluchtens.stats.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FortyTwoUserRepository fortyTwoUserRepository;

    public User getUserInfo(int id) {
        Optional<User> user = userRepository.findById(id);
        if (!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user data found");
        }
        return user.get();
    }

    public List<FortyTwoUser> getUsers() {
        return fortyTwoUserRepository.findAll();
    }
}
