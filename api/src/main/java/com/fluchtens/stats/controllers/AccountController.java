package com.fluchtens.stats.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.Account;
import com.fluchtens.stats.services.AccountService;

@RestController
@RequestMapping("/accounts")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping()
    public Account getAccount() {
        int id = Integer.parseInt(SecurityContextHolder.getContext().getAuthentication().getName());
        return this.accountService.getAccount(id);
    }

    @GetMapping("/count")
    public long getAccountsCount() {
        return this.accountService.getAccountsCount();
    }

    @GetMapping("/active/count")
    public long getActiveAccountsCount() {
        return this.accountService.getActiveAccountsCount();
    }
}
