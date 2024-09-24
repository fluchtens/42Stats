package com.fluchtens.stats.rncp;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class SuiteRncp {
    private List<Project> projects;

    public SuiteRncp() {}

    public SuiteRncp(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
