package com.fluchtens.stats.services;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.models.Project;
import com.fluchtens.stats.repositories.ProjectRepository;
import com.fluchtens.stats.rncp.MobileRncp;
import com.fluchtens.stats.rncp.Rncp;
import com.fluchtens.stats.rncp.WebRncp;

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

    public Rncp getRncpProjects() {
        List<String> webSlugs = Arrays.asList("42cursus-camagru", "42cursus-matcha", "42cursus-hypertube", "42cursus-red-tetris", "42cursus-darkly", "42cursus-h42n42", "tokenizer");
        List<Project> webProjects = this.projectRepository.findBySlugIn(webSlugs);
        webProjects.sort(Comparator.comparingInt(p -> webSlugs.indexOf(p.getSlug())));

        List<String> symfonySlugs = Arrays.asList("symfony-0-oob", "symfony-1-base-symfony", "symfony-2-sql", "symfony-3-final");
        List<Project> symfonyProjects = this.projectRepository.findBySlugIn(symfonySlugs);
        symfonyProjects.sort(Comparator.comparingInt(p -> symfonySlugs.indexOf(p.getSlug())));

        List<String> djangoSlugs = Arrays.asList("django-0-oob", "django-1-base-django", "django-2-sql", "django-3-final");
        List<Project> djangoProjects = this.projectRepository.findBySlugIn(djangoSlugs);
        djangoProjects.sort(Comparator.comparingInt(p -> djangoSlugs.indexOf(p.getSlug())));

        List<String> rorSlugs = Arrays.asList("ror-0-oob", "ror-1-base-rails", "ror-2-sql", "ror-3-final");
        List<Project> rorProjects = this.projectRepository.findBySlugIn(rorSlugs);
        rorProjects.sort(Comparator.comparingInt(p -> rorSlugs.indexOf(p.getSlug())));

        List<String> mobileSlugs = Arrays.asList("42cursus-ft_hangouts", "42cursus-swifty-companion", "42cursus-swifty-proteins");
        List<Project> mobileProjects = this.projectRepository.findBySlugIn(mobileSlugs);
        mobileProjects.sort(Comparator.comparingInt(p -> mobileSlugs.indexOf(p.getSlug())));

        List<String> mobilePoolSlugs = Arrays.asList("mobile-0-basic-of-the-mobile-application", "mobile-1-structure-and-logic", "mobile-2-api-and-data", "mobile-3-design", "mobile-4-auth-and-database", "mobile-5-manage-data-and-display");
        List<Project> mobilePoolProjects = this.projectRepository.findBySlugIn(mobilePoolSlugs);
        mobilePoolProjects.sort(Comparator.comparingInt(p -> mobilePoolSlugs.indexOf(p.getSlug())));

        return new Rncp(new WebRncp(webProjects, symfonyProjects, djangoProjects, rorProjects), new MobileRncp(mobileProjects, mobilePoolProjects));
    }
}
