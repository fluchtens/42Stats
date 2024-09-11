package com.fluchtens.stats.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.Project;
import com.fluchtens.stats.repositories.ProjectRepository;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project getProject(int id) {
        Optional<Project> projectOptional = this.projectRepository.findById(id);
        if (!projectOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found");
        }
        return projectOptional.get();
    }

    public List<Project> getProjects() {
        return this.projectRepository.findAll();
    }
}
