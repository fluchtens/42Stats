package com.fluchtens.stats.rncp.projects.network;

import java.util.List;

import com.fluchtens.stats.project.Project;

public class UnixProjects {
    private List<Project> projects;

    public UnixProjects() {}

    public UnixProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
