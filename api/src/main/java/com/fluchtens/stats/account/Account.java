package com.fluchtens.stats.account;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Account {
    @Id
    private int id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false, unique = true)
    private String login;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private double level;

    @Column(nullable = false)
    private int campusId;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public Account() {}

    public Account(int id, String email, String login, String image, double level, int campusId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.email = email;
        this.login = login;
        this.image = image;
        this.level = level;
        this.campusId = campusId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return this.login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getImage() {
        return this.image;
    }

    public double getLevel() {
        return this.level;
    }

    public void setLevel(double level) {
        this.level = level;
    }

    public int getCampusId() {
        return this.campusId;
    }

    public void setCampusId(int campusId) {
        this.campusId = campusId;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return this.updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public boolean isValid() {
        if (this.id <= 0)
            return false;
        if (this.email == null || this.email.isEmpty())
            return false;
        if (this.login == null || this.login.isEmpty())
            return false;
        if (this.level < 0)
            return false;
        if (this.campusId <= 0)
            return false;
        if (this.createdAt == null)
            return false;
        if (this.updatedAt == null)
            return false;
        return true;
    }
}
