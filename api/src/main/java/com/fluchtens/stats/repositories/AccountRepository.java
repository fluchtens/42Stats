package com.fluchtens.stats.repositories;

import java.time.LocalDateTime;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {
    @Query("SELECT COUNT(a) FROM Account a WHERE a.updatedAt BETWEEN ?1 AND ?2")
    long countActive(LocalDateTime startOfMonth, LocalDateTime endOfMonth);
}
