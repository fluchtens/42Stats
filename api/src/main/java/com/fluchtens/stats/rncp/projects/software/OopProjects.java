package com.fluchtens.stats.rncp.projects.software;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class OopProjects {
    private List<Project> projects;
    private List<Project> symfony;
    private List<Project> django;
    private List<Project> ror; 
    private List<Project> mobile;
    private List<Project> object;

    public OopProjects() {}

    public OopProjects(List<Project> projects, List<Project> symfony, List<Project> django, List<Project> ror, List<Project> mobile, List<Project> object) {
        this.projects = projects;
        this.symfony = symfony;
        this.django = django;
        this.ror = ror;
        this.mobile = mobile;
        this.object = object;
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

    public List<Project> getMobile() {
        return this.mobile;
    }

    public void setMobile(List<Project> mobile) {
        this.mobile = mobile;
    }

    public List<Project> getObject() {
        return this.object;
    }

    public void setObject(List<Project> object) {
        this.object = object;
    }
}
