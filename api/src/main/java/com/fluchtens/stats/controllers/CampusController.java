package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.models.FortyTwoUser;
import com.fluchtens.stats.services.CampusService;

@RestController 
@RequestMapping("/campus")
public class CampusController {
    @Autowired
    private CampusService campusService;

    @GetMapping()
    public List<FortyTwoCampus> getCampuses() {
        return this.campusService.getCampuses();
    }

    @GetMapping("/{id}")
    public FortyTwoCampus getCampus(@PathVariable int id) {
        return this.campusService.getCampuse(id);
    }

    @GetMapping("{id}/users")
    public List<FortyTwoUser> getCampusUsers(@PathVariable int id, @RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "42") int pageSize) {
        PageRequest pageable = PageRequest.of(page - 1, pageSize);
        return this.campusService.getCampusUsers(id, pageable);
    }
}
