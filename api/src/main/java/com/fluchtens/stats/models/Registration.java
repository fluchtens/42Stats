package com.fluchtens.stats.models;

public class Registration {
    private String month;
    private long count;

    public Registration() {}

    public Registration(String month, long count) {
        this.month = month;
        this.count = count;
    }

    public String getMonth() {
        return this.month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public long getCount() {
        return this.count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
