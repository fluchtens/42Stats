package com.fluchtens.stats.services;

import java.util.Arrays;
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

    private List<String> monthNames = Arrays.asList("january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december");

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
                int yearComparison = Integer.compare(Integer.parseInt(a.getYear()), Integer.parseInt(b.getYear()));
                if (yearComparison != 0) {
                    return yearComparison;
                }
                int monthA = this.monthNames.indexOf(a.getMonth().toLowerCase());
                int monthB = this.monthNames.indexOf(b.getMonth().toLowerCase());
                return Integer.compare(monthA, monthB);
            })
            .collect(Collectors.toList());
        return poolDates;
    }
}
