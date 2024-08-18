package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.User;
import com.fluchtens.stats.services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping()
    public List<User> getUsers() {
        return this.userService.getUsers();
    }

    @GetMapping("/count")
    public long getCampusCount() {
        return this.userService.getUsersCount();
    }

    @GetMapping("/levels/average")
    public Double getUsersAverageLevel() {
        return this.userService.getUsersAverageLevel();
    }

    @GetMapping("/campus/{id}")
    public List<User> getCampusUsers(
        @PathVariable int id,
        @RequestParam(required = false) String poolMonth,
        @RequestParam(required = false) String poolYear,
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "42") int pageSize
    ) {
        PageRequest pageable = PageRequest.of(page - 1, pageSize);
        return this.userService.getCampusUsers(id, poolMonth, poolYear, pageable);
    }

    @GetMapping("/campus/{id}/count")
    public int getCampusUsersCount(
        @PathVariable int id,
        @RequestParam(required = false) String poolMonth,
        @RequestParam(required = false) String poolYear
    ) {
        return this.userService.getCampusUsersCount(id, poolMonth, poolYear);
    }
}
