package com.fluchtens.stats.services;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.Account;
import com.fluchtens.stats.repositories.AccountRepository;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    public Account getAccount(int id) {
        Optional<Account> user = this.accountRepository.findById(id);
        if (!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No user data found");
        }
        return user.get();
    }

    public long getAccountsCount() {
        return this.accountRepository.count();
    }

    public long getActiveAccountsCount() {
        YearMonth currentMonth = YearMonth.now();
        LocalDateTime startOfMonth = currentMonth.atDay(1).atStartOfDay();
        LocalDateTime endOfMonth = currentMonth.atEndOfMonth().atTime(23, 59, 59);
        return this.accountRepository.countActive(startOfMonth, endOfMonth);
    }
}
