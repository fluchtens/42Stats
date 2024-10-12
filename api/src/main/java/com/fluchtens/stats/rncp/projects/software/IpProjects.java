package com.fluchtens.stats.rncp.projects.software;

import java.util.List;

import com.fluchtens.stats.project.Project;

public class IpProjects {
    private List<Project> projects;

    public IpProjects() {}

    public IpProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }
}
