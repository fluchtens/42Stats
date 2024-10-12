package com.fluchtens.stats.rncp.projects.suite;

import java.util.List;

import com.fluchtens.stats.project.Project;

public class SuiteProjects {
    private List<Project> projects;

    public SuiteProjects() {}

    public SuiteProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
