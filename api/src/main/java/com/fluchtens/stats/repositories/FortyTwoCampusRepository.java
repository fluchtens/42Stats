package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.FortyTwoCampus;

@Repository
public interface FortyTwoCampusRepository extends JpaRepository<FortyTwoCampus, Integer> {}
