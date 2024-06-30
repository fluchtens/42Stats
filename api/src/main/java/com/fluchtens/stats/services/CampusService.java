package com.fluchtens.stats.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.models.FortyTwoUser;
import com.fluchtens.stats.repositories.FortyTwoCampusRepository;
import com.fluchtens.stats.repositories.FortyTwoUserRepository;

@Service
public class CampusService {
    @Autowired
    private FortyTwoCampusRepository campusRepository;

    @Autowired
    private FortyTwoUserRepository userRepository;

    public List<FortyTwoCampus> getCampuses() {
        return this.campusRepository.findAll();
    }

    public FortyTwoCampus getCampuse(int id) {
        Optional<FortyTwoCampus> campusOptional = this.campusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }
        return campusOptional.get();
    }

    public List<FortyTwoUser> getCampusUsers(int id, Pageable pageable) {
        Optional<FortyTwoCampus> campusOptional = this.campusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }
        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("level").descending());
        return this.userRepository.findByCampusId(id, pageable);
    }
}
