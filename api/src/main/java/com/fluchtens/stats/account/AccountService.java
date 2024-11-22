package com.fluchtens.stats.account;

import java.time.LocalDateTime;
import java.time.Month;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.account.dtos.CampusAccountCountDTO;
import com.fluchtens.stats.account.registration.Registration;
import com.fluchtens.stats.core.JsonResponse;

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

    public List<Registration> getMonthlyRegistrations() {
        LocalDateTime startDate = LocalDateTime.now().minusMonths(6).withDayOfMonth(1).toLocalDate().atStartOfDay();
        List<Object[]> results = accountRepository.findMonthlyRegistrations(startDate);
        List<Registration> monthlyRegistrations = new ArrayList<>();

        for (Object[] result : results) {
            int year = (int) result[0];
            int month = (int) result[1];
            long count = (long) result[2];
            Month monthEnum = Month.of(month);
            String monthName = monthEnum.getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            String monthYear = monthName + " " + year;
            Registration registration = new Registration(monthYear, count);
            monthlyRegistrations.add(registration);
        }
        return monthlyRegistrations;
    }

    public List<Registration> getCumulativeUsers() {
        LocalDateTime startDate = LocalDateTime.now().minusMonths(6).withDayOfMonth(1).toLocalDate().atStartOfDay();
        List<Object[]> results = accountRepository.findMonthlyRegistrations(startDate);
        List<Registration> cumulativeRegistrations = new ArrayList<>();
        long cumulativeCount = accountRepository.countUsersBeforeDate(startDate);

        for (Object[] result : results) {
            int year = (int) result[0];
            int month = (int) result[1];
            long count = (long) result[2];
            Month monthEnum = Month.of(month);
            String monthName = monthEnum.getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
            String monthYear = monthName + " " + year;
            cumulativeCount += count;
            Registration registration = new Registration(monthYear, cumulativeCount);
            cumulativeRegistrations.add(registration);
        }
        return cumulativeRegistrations;
    }

    public List<CampusAccountCountDTO> getCampusAccountCounts(int page, int pageSize) {
    Pageable pageable = PageRequest.of(page - 1, pageSize);
    Page<Object[]> results = accountRepository.countAccountsByCampus(pageable);
    List<CampusAccountCountDTO> campusAccountCounts = new ArrayList<>();
    
    for (Object[] result : results) {
        String campusName = (String) result[0];
        long count = (long) result[1];
        campusAccountCounts.add(new CampusAccountCountDTO(campusName, count));
    }
    return campusAccountCounts;
}

}
