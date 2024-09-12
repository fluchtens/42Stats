package com.fluchtens.stats.services;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.JsonResponse;
import com.fluchtens.stats.models.Account;
import com.fluchtens.stats.models.MonthlyRegistration;
import com.fluchtens.stats.repositories.AccountRepository;

@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Account getAccount(int id) {
        Optional<Account> user = this.accountRepository.findById(id);
        if (!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return user.get();
    }

    public JsonResponse deleteAccount(String id) {
        Optional<Account> user = this.accountRepository.findById(Integer.parseInt(id));
        if (!user.isPresent()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        this.accountRepository.deleteById(Integer.parseInt(id));
        String deleteSessionsQuery = "DELETE FROM SPRING_SESSION WHERE PRINCIPAL_NAME = ?";
        jdbcTemplate.update(deleteSessionsQuery, id);
        return new JsonResponse("User deleted successfully");
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

    public List<MonthlyRegistration> getMonthlyRegistrations() {
        LocalDateTime twelveMonthsAgo = LocalDateTime.now().minusMonths(12).withDayOfMonth(1).toLocalDate().atStartOfDay();
        List<Object[]> results = accountRepository.findMonthlyRegistrations(twelveMonthsAgo);

        List<MonthlyRegistration> monthlyRegistrations = new ArrayList<>();
        for (Object[] result : results) {
            int year = (int) result[0];
            int month = (int) result[1];
            long count = (long) result[2];

            Month monthEnum = Month.of(month);
            String monthName = monthEnum.getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            String monthYear = monthName + " " + year;

            MonthlyRegistration registration = new MonthlyRegistration(monthYear, count);
            monthlyRegistrations.add(registration);
        }
        return monthlyRegistrations;
    }
}
