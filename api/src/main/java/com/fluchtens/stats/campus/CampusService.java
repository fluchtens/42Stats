package com.fluchtens.stats.campus;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.campus.pool.PoolDate;
import com.fluchtens.stats.user.User;
import com.fluchtens.stats.user.UserRepository;

@Service
public class CampusService {
    @Autowired
    private CampusRepository campusRepository;

    @Autowired
    private UserRepository userRepository;

    private List<String> monthNames = Arrays.asList("january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december");

    public List<Campus> getCampuses() {
        return this.campusRepository.findAll();
    }

    public long getCampusCount() {
        return this.campusRepository.count();
    }

    public Campus getCampus(int id) {
        Optional<Campus> campusOptional = this.campusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }
        return campusOptional.get();
    }

    public List<PoolDate> getCampusPools(int id) {
        Optional<Campus> campusOptional = this.campusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }

        List<User> users = this.userRepository.findByCampusId(id);    
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
