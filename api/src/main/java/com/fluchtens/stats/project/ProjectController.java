package com.fluchtens.stats.project;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProjectController {
    @Autowired ProjectService projectService;

    @GetMapping("/projects")
    public List<Project> getProjects() {
        return this.projectService.getProjects();
    }

    @GetMapping("/projects/{id}")
    public Project getProject(@PathVariable int id) {
        return this.projectService.getProject(id);
    }
}
