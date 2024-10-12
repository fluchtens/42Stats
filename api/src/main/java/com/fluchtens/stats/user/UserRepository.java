package com.fluchtens.stats.user;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByCampusId(int campusId);

    List<User> findByCampusId(int campusId, Pageable pageable);

    @Query("SELECT AVG(u.level) FROM User u")
    Double findAverageLevel();

    @Query("SELECT COUNT(u) FROM User u WHERE u.campus.id = ?1")
    int countByCampus(int campusId);
    
    @Query("SELECT AVG(u.level) FROM User u WHERE u.campus.id = ?1")
    Double findAverageLevelByCampus(int campusId);

    @Query("SELECT u FROM User u WHERE u.campus.id = ?1 AND u.poolMonth = ?2 AND u.poolYear = ?3")
    List<User> findByCampusPool(int campusId, String poolMonth, String poolYear, Pageable pageable);

    @Query("SELECT COUNT(u) FROM User u WHERE u.campus.id = ?1 AND u.poolMonth = ?2 AND u.poolYear = ?3")
    int countByCampusPool(int campusId, String poolMonth, String poolYear);
}
