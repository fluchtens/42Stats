package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {}
