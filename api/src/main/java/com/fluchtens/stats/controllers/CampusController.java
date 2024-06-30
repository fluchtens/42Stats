package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.models.PoolDate;
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
        return this.campusService.getCampus(id);
    }

    @GetMapping("{id}/pools")
    public List<PoolDate> getCampusPools(@PathVariable int id) {
        return this.campusService.getCampusPools(id);
    }
}
