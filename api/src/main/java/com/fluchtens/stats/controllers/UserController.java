package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.FortyTwoUser;
import com.fluchtens.stats.models.User;
import com.fluchtens.stats.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public List<FortyTwoUser> getUsers() {
        return this.userService.getUsers();
    }

    @GetMapping("/me")
    public User getUserInfo() {
        int id = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
        return this.userService.getUserInfo(id);
    }
}
