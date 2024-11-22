package com.fluchtens.stats.account.dtos;

public class CampusAccountCountDTO {
    private String campus;
    private long count;

    public CampusAccountCountDTO(String campus, long count) {
        this.campus = campus;
        this.count = count;
    }

    public String getCampus() {
        return this.campus;
    }

    public void setCampus(String campus) {
        this.campus = campus;
    }

    public long getCount() {
        return this.count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
