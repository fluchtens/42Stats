package com.fluchtens.stats.models;

public class MonthlyRegistration {
    private String month;
    private long registration;

    public MonthlyRegistration() {}

    public MonthlyRegistration(String month, long registration) {
        this.month = month;
        this.registration = registration;
    }

    public String getMonth() {
        return this.month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getRegistration() {
        return this.registration;
    }

    public void setRegistration(long registration) {
        this.registration = registration;
    }
}
