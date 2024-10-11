package com.fluchtens.stats.rncp.projects.web;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class MobilePoolProjects {
    private List<Project> projects;
    private List<Project> mobile;

    public MobilePoolProjects() {}

    public MobilePoolProjects(List<Project> projects, List<Project> mobile) {
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
