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
import com.fluchtens.stats.models.User;
import com.fluchtens.stats.repositories.FortyTwoCampusRepository;
import com.fluchtens.stats.repositories.FortyTwoUserRepository;
import com.fluchtens.stats.repositories.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FortyTwoUserRepository fortyTwoUserRepository;

    @Autowired
    private FortyTwoCampusRepository fortyTwoCampusRepository;
    
    public List<FortyTwoUser> getUsers() {
        return this.fortyTwoUserRepository.findAll();
    }

    public User getUserInfo(int id) {
        Optional<User> user = this.userRepository.findById(id);
        if (!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user data found");
        }
        return user.get();
    }

    public List<FortyTwoUser> getCampusUsers(int id, String poolMonth, String poolYear, Pageable pageable) {
        Optional<FortyTwoCampus> campusOptional = this.fortyTwoCampusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }

        if (poolMonth != null && poolYear != null) {
            pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("level").descending());
            return this.fortyTwoUserRepository.findByCampusPool(id, poolMonth, poolYear, pageable);
        }

        pageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by("level").descending());
        return this.fortyTwoUserRepository.findByCampusId(id, pageable);
    }

    public int getCampusUsersCount(int id, String poolMonth, String poolYear) {
        Optional<FortyTwoCampus> campusOptional = this.fortyTwoCampusRepository.findById(id);
        if (!campusOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Campus not found");
        }

        if (poolMonth != null && poolYear != null) {
            return this.fortyTwoUserRepository.countByCampusPool(id, poolMonth, poolYear);
        }

        return this.fortyTwoUserRepository.countByCampus(id);
    }
}
