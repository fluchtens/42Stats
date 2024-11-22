package com.fluchtens.stats.account;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query("SELECT COUNT(a) FROM Account a WHERE a.updatedAt BETWEEN ?1 AND ?2")
    long countActive(LocalDateTime startOfMonth, LocalDateTime endOfMonth);

    @Query("SELECT YEAR(a.createdAt), MONTH(a.createdAt), COUNT(a) " +
            "FROM Account a " +
            "WHERE a.createdAt >= :startDate " +
            "GROUP BY YEAR(a.createdAt), MONTH(a.createdAt) " +
            "ORDER BY YEAR(a.createdAt), MONTH(a.createdAt)")
    List<Object[]> findMonthlyRegistrations(LocalDateTime startDate);

    @Query("SELECT COUNT(a) FROM Account a WHERE a.createdAt < :startDate")
    long countUsersBeforeDate(@Param("startDate") LocalDateTime startDate);

    @Query("SELECT c.name, COUNT(a) " +
            "FROM Account a " +
            "JOIN Campus c ON a.campusId = c.id " +
            "GROUP BY c.name " +
            "ORDER BY COUNT(a) DESC")
    Page<Object[]> countAccountsByCampus(Pageable pageable);
}
