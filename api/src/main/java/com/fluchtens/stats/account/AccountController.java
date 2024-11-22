package com.fluchtens.stats.account;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.account.dtos.CampusAccountCountDTO;
import com.fluchtens.stats.account.registration.Registration;
import com.fluchtens.stats.core.JsonResponse;

@RestController
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/accounts")
    public Account getAccount() {
        int id = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
        return this.accountService.getAccount(id);
    }

    @DeleteMapping("/accounts")
    public JsonResponse deleteSession() {
        String id = SecurityContextHolder.getContext().getAuthentication().getName();
        return this.accountService.deleteAccount(id);
    }

    @GetMapping("/accounts/count")
    public long getAccountsCount() {
        return this.accountService.getAccountsCount();
    }

    @GetMapping("/accounts/active/count")
    public long getActiveAccountsCount() {
        return this.accountService.getActiveAccountsCount();
    }

    @GetMapping("/accounts/monthly-registrations")
    public List<Registration> getMonthlyRegistrations() {
        return this.accountService.getMonthlyRegistrations();
    }

    @GetMapping("accounts/cumulative-users")
    public List<Registration> getCumulativeUsers() {
        return this.accountService.getCumulativeUsers();
    }

    @GetMapping("/accounts/campus-counts")
    public List<CampusAccountCountDTO> getCampusAccountCounts(
        @RequestParam(defaultValue = "1") int page,
        @RequestParam(defaultValue = "5") int pageSize
    ) {
        return this.accountService.getCampusAccountCounts(page, pageSize);
    }
}
