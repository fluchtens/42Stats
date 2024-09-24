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
import com.fluchtens.stats.rncp.SuiteRncp;
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

    private List<Project> getSortedProjectsBySlugs(List<String> slugs) {
        List<Project> projects = this.projectRepository.findBySlugIn(slugs);
        projects.sort(Comparator.comparingInt(p -> slugs.indexOf(p.getSlug())));
        return projects;
    }

    public Rncp getRncpProjects() {
        List<Project> web = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-camagru", "42cursus-matcha", "42cursus-hypertube", "42cursus-red-tetris", "42cursus-darkly", "42cursus-h42n42", "tokenizer"));
        List<Project> symfonyPool = this.getSortedProjectsBySlugs(Arrays.asList("symfony-0-oob", "symfony-1-base-symfony", "symfony-2-sql", "symfony-3-final"));
        List<Project> djangoPool = this.getSortedProjectsBySlugs(Arrays.asList("django-0-oob", "django-1-base-django", "django-2-sql", "django-3-final"));
        List<Project> rorPool = this.getSortedProjectsBySlugs(Arrays.asList("ror-0-oob", "ror-1-base-rails", "ror-2-sql", "ror-3-final"));
        WebRncp webRncp = new WebRncp(web, symfonyPool, djangoPool, rorPool);

        List<Project> mobile = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-ft_hangouts", "42cursus-swifty-companion", "42cursus-swifty-proteins"));
        List<Project> mobilePool = this.getSortedProjectsBySlugs(Arrays.asList("mobile-0-basic-of-the-mobile-application", "mobile-1-structure-and-logic", "mobile-2-api-and-data", "mobile-3-design", "mobile-4-auth-and-database", "mobile-5-manage-data-and-display"));
        MobileRncp mobileRncp = new MobileRncp(mobile, mobilePool);

        List<Project> suite = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-42sh", "42cursus-doom-nukem", "inception-of-things", "42cursus-humangl", "42cursus-kfs-2", "42cursus-override", "42cursus-pestilence", "42cursus-rt", "42cursus-total-perspective-vortex"));
        SuiteRncp suiteRncp = new SuiteRncp(suite);

        return new Rncp(webRncp, mobileRncp, suiteRncp);
    }
}
