package com.fluchtens.stats.rncp.projects.database;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class AiProjects {
    private List<Project> projects;
    private List<Project> dataScience;
    private List<Project> python;

    public AiProjects() {}

    public AiProjects(List<Project> projects, List<Project> dataScience, List<Project> python) {
        this.projects = projects;
        this.dataScience = dataScience;
        this.python = python;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getDataScience() {
        return this.dataScience;
    }

    public void setDataScience(List<Project> dataScience) {
        this.dataScience = dataScience;
    }

    public List<Project> getPython() {
        return this.python;
    }

    public void setPython(List<Project> python) {
        this.python = python;
    }
}
