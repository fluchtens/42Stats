package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.repositories.FortyTwoCampusRepository;

@RestController
public class FortyTwoCampusController {
  @Autowired
  private FortyTwoCampusRepository campusRepository;

  @GetMapping("/campuses")
  public List<FortyTwoCampus> getCampuses() {
    return campusRepository.findAll();
  }
}
