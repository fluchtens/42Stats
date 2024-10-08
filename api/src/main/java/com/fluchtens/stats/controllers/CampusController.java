package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.Campus;
import com.fluchtens.stats.models.PoolDate;
import com.fluchtens.stats.services.CampusService;

@RestController 
public class CampusController {
    @Autowired
    private CampusService campusService;

    @GetMapping("/campuses")
    public List<Campus> getCampuses() {
        return this.campusService.getCampuses();
    }

    @GetMapping("/campuses/count")
    public long getCampusCount() {
        return this.campusService.getCampusCount();
    }

    @GetMapping("/campuses/{id}")
    public Campus getCampus(@PathVariable int id) {
        return this.campusService.getCampus(id);
    }

    @GetMapping("/campuses/{id}/pools")
    public List<PoolDate> getCampusPools(@PathVariable int id) {
        return this.campusService.getCampusPools(id);
    }
}
