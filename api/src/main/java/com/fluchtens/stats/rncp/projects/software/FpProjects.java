package com.fluchtens.stats.rncp.projects.software;

import java.util.List;

import com.fluchtens.stats.project.Project;

public class FpProjects {
    private List<Project> projects;
    private List<Project> ocaml;

    public FpProjects() {}

    public FpProjects(List<Project> projects, List<Project> ocaml) {
        this.projects = projects;
        this.ocaml = ocaml;
    }

    public List<Project> getProjects() {
        return this.projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Project> getOcaml() {
        return this.ocaml;
    }

    public void setOcaml(List<Project> ocaml) {
        this.ocaml = ocaml;
    }
}
