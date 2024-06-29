package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.FortyTwoCampus;
import com.fluchtens.stats.models.FortyTwoUser;

@Repository
public interface FortyTwoUserRepository extends JpaRepository<FortyTwoUser, Integer> {
    int countUsersByCampusId(int campusId);

    @Query("SELECT AVG(e.level) FROM FortyTwoUser e WHERE e.campus = ?1")
    double findAverageLevelByCampusId(FortyTwoCampus campus);
}
