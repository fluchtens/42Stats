package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.Campus;

@Repository
public interface CampusRepository extends JpaRepository<Campus, Integer> {}
