package com.fluchtens.stats.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fluchtens.stats.models.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {}
