package com.fluchtens.stats.campus.pool;

import java.util.Objects;

public class PoolDate {
    private String month;
    private String year;

    public PoolDate() {}

    public PoolDate(String month, String year) {
        this.month = month;
        this.year = year;
    }

    public String getMonth() {
        return this.month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getYear() {
        return this.year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PoolDate poolDate = (PoolDate) o;
        return Objects.equals(month, poolDate.month) && Objects.equals(year, poolDate.year);
    }

    @Override
    public int hashCode() {
        return Objects.hash(month, year);
    }
}
