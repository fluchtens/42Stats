package com.fluchtens.stats.rncp.projects.database;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class DbProjects {
    private List<Project> projects;
    private List<Project> symfony;
    private List<Project> django;
    private List<Project> ror; 

    public DbProjects() {}

    public DbProjects(List<Project> projects, List<Project> symfony, List<Project> django, List<Project> ror) {
        this.projects = projects;
        this.symfony = symfony;
        this.django = django;
        this.ror = ror;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getSymfony() {
        return this.symfony;
    }

    public void setSymfony(List<Project> symfony) {
        this.symfony = symfony;
    }

    public List<Project> getDjango() {
        return this.django;
    }

    public void setDjango(List<Project> django) {
        this.django = django;
    }

    public List<Project> getRor() {
        return this.ror;
    }

    public void setRor(List<Project> ror) {
        this.ror = ror;
    }
}
