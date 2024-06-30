package com.fluchtens.stats.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.models.FortyTwoUser;
import com.fluchtens.stats.models.PoolDate;
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

    public FortyTwoCampus getCampus(int id) {
        Optional<FortyTwoCampus> campusOptional = this.campusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }
        return campusOptional.get();
    }

    public List<PoolDate> getCampusPools(int id) {
        Optional<FortyTwoCampus> campusOptional = this.campusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }
        
        List<FortyTwoUser> users = this.userRepository.findByCampusId(id);    
        List<PoolDate> poolDates = users.stream()
            .map(user -> new PoolDate(user.getPoolMonth(), user.getPoolYear()))
            .distinct()
            .sorted((a, b) -> {
                int yearComparison = a.getYear().compareTo(b.getYear());
                return yearComparison != 0 ? yearComparison : a.getMonth().compareTo(b.getMonth());
            })
            .collect(Collectors.toList());
        return poolDates;
    }
    
}
