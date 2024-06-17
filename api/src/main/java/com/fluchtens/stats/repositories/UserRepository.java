package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {}
