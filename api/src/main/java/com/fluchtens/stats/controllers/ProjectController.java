package com.fluchtens.stats.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.models.Project;
import com.fluchtens.stats.services.ProjectService;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    @Autowired ProjectService projectService;

    @GetMapping()
    public List<Project> getProjects() {
        return this.projectService.getProjects();
    }

    @GetMapping("/{id}")
    public Project getProject(@PathVariable int id) {
        return this.projectService.getProject(id);
    }
}
