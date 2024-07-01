package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.Account;
import com.fluchtens.stats.models.FortyTwoUser;
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
    public Account getUserInfo() {
        int id = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
        return this.userService.getUserInfo(id);
    }

    @GetMapping("/campus/{id}")
    public List<FortyTwoUser> getCampusUsers(
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
