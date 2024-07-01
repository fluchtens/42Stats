package com.fluchtens.stats.repositories;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.FortyTwoUser;

@Repository
public interface FortyTwoUserRepository extends JpaRepository<FortyTwoUser, Integer> {
    List<FortyTwoUser> findByCampusId(int campusId);

    List<FortyTwoUser> findByCampusId(int campusId, Pageable pageable);

    @Query("SELECT COUNT(u) FROM FortyTwoUser u WHERE u.campus.id = ?1")
    int countByCampus(int campusId);
    
    @Query("SELECT AVG(u.level) FROM FortyTwoUser u WHERE u.campus.id = ?1")
    Double findAverageLevelByCampus(int campusId);

    @Query("SELECT u FROM FortyTwoUser u WHERE u.campus.id = ?1 AND u.poolMonth = ?2 AND u.poolYear = ?3")
    List<FortyTwoUser> findByCampusPool(int campusId, String poolMonth, String poolYear, Pageable pageable);

    @Query("SELECT COUNT(u) FROM FortyTwoUser u WHERE u.campus.id = ?1 AND u.poolMonth = ?2 AND u.poolYear = ?3")
    int countByCampusPool(int campusId, String poolMonth, String poolYear);
}
