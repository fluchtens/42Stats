package com.fluchtens.stats.rncp.projects.network;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class SystemProjects {
    private List<Project> projects;

    public SystemProjects() {}

    public SystemProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
