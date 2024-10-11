package com.fluchtens.stats.rncp.projects.network;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class SecurityProjects {
    private List<Project> projects;
    private List<Project> security;

    public SecurityProjects() {}

    public SecurityProjects(List<Project> projects, List<Project> security) {
        this.projects = projects;
        this.security = security;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getSecurity() {
        return this.security;
    }

    public void setSecurity(List<Project> security) {
        this.security = security;
    }
}
