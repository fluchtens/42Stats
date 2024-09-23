package com.fluchtens.stats.rncp;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class MobileRncp {
    private List<Project> projects;
    private List<Project> mobile;

    public MobileRncp() {}

    public MobileRncp(List<Project> projects, List<Project> mobile) {
        this.projects = projects;
        this.mobile = mobile;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getMobile() {
        return this.mobile;
    }

    public void setMobile(List<Project> mobile) {
        this.mobile = mobile;
    }
}
