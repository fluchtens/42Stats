package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.services.FortyTwoCampusService;

@RestController
public class FortyTwoCampusController {
  @Autowired
  private FortyTwoCampusService campusService;

  @GetMapping("/campuses")
  public List<FortyTwoCampus> getCampuses() {
    return campusService.getCampuses();
  }

  @GetMapping("/campus/{id}")
  public FortyTwoCampus getCampus(@PathVariable int id) {
    return campusService.getCampuse(id);
  }
}
