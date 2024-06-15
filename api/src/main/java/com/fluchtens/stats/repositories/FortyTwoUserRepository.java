package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.FortyTwoUser;

@Repository
public interface FortyTwoUserRepository extends JpaRepository<FortyTwoUser, Integer> {}
