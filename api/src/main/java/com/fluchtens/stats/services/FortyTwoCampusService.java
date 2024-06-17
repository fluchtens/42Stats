package com.fluchtens.stats.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.repositories.FortyTwoCampusRepository;

@Service
public class FortyTwoCampusService {
  @Autowired
  private FortyTwoCampusRepository campusRepository;

  public List<FortyTwoCampus> getCampuses() {
    return campusRepository.findAll();
  }

  public FortyTwoCampus getCampuse(int id) {
    Optional<FortyTwoCampus> campusOptional = campusRepository.findById(id);
    if (!campusOptional.isPresent()) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
    }
    FortyTwoCampus campus = campusOptional.get();
    return campus;
  }
}
