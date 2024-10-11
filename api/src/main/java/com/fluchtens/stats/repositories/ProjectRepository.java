package com.fluchtens.stats.repositories;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Integer> {
    boolean existsBySlug(String slug);
    boolean existsByName(String name);

    @Query("SELECT p FROM Project p WHERE p.slug IN :names ORDER BY p.id")
    List<Project> findBySlugIn(List<String> names);
}
