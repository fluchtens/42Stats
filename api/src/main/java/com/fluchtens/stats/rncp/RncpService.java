package com.fluchtens.stats.rncp;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fluchtens.stats.models.Project;
import com.fluchtens.stats.repositories.ProjectRepository;
import com.fluchtens.stats.rncp.projects.DatabaseRncp;
import com.fluchtens.stats.rncp.projects.NetworkRncp;
import com.fluchtens.stats.rncp.projects.SoftwareRncp;
import com.fluchtens.stats.rncp.projects.WebRncp;
import com.fluchtens.stats.rncp.projects.database.AiProjects;
import com.fluchtens.stats.rncp.projects.database.DbProjects;
import com.fluchtens.stats.rncp.projects.network.SecurityProjects;
import com.fluchtens.stats.rncp.projects.network.SystemProjects;
import com.fluchtens.stats.rncp.projects.network.UnixProjects;
import com.fluchtens.stats.rncp.projects.software.FpProjects;
import com.fluchtens.stats.rncp.projects.software.IpProjects;
import com.fluchtens.stats.rncp.projects.software.OopProjects;
import com.fluchtens.stats.rncp.projects.suite.SuiteProjects;
import com.fluchtens.stats.rncp.projects.web.MobilePoolProjects;
import com.fluchtens.stats.rncp.projects.web.WebProjects;

@Service
public class RncpService {
    @Autowired
    private ProjectRepository projectRepository;

    private List<Project> getSortedProjectsBySlugs(List<String> slugs) {
        List<Project> projects = this.projectRepository.findBySlugIn(slugs);
        projects.sort(Comparator.comparingInt(p -> slugs.indexOf(p.getSlug())));
        return projects;
    }

    private WebRncp getWebRncp() {
        List<Project> suite = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-42sh", "42cursus-doom-nukem", "inception-of-things", "42cursus-humangl", "42cursus-kfs-2", "42cursus-override", "42cursus-pestilence", "42cursus-rt", "42cursus-total-perspective-vortex"));
        SuiteProjects suiteProjects = new SuiteProjects(suite);
        
        List<Project> web = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-camagru", "42cursus-matcha", "42cursus-hypertube", "42cursus-red-tetris", "42cursus-darkly", "42cursus-h42n42", "tokenizer"));
        List<Project> symfonyPool = this.getSortedProjectsBySlugs(Arrays.asList("symfony-0-oob", "symfony-1-base-symfony", "symfony-2-sql", "symfony-3-final"));
        List<Project> djangoPool = this.getSortedProjectsBySlugs(Arrays.asList("django-0-oob", "django-1-base-django", "django-2-sql", "django-3-final"));
        List<Project> rorPool = this.getSortedProjectsBySlugs(Arrays.asList("ror-0-oob", "ror-1-base-rails", "ror-2-sql", "ror-3-final"));
        WebProjects webProjects = new WebProjects(web, symfonyPool, djangoPool, rorPool);
        
        List<Project> mobilePool = this.getSortedProjectsBySlugs(Arrays.asList("mobile-0-basic-of-the-mobile-application", "mobile-1-structure-and-logic", "mobile-2-api-and-data", "mobile-3-design", "mobile-4-auth-and-database", "mobile-5-manage-data-and-display"));
        List<Project> mobile = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-ft_hangouts", "42cursus-swifty-companion", "42cursus-swifty-proteins"));
        MobilePoolProjects mobileProjects = new MobilePoolProjects(mobile, mobilePool);

        return new WebRncp(suiteProjects, webProjects, mobileProjects);
    }

    private SoftwareRncp getSoftwareRncp() {
        List<Project> suite = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-42sh", "42cursus-doom-nukem", "inception-of-things", "42cursus-humangl", "42cursus-kfs-2", "42cursus-override", "42cursus-pestilence", "42cursus-rt", "42cursus-total-perspective-vortex"));
        SuiteProjects suiteProjects = new SuiteProjects(suite);

        List<Project> oop = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-bomberman", "42cursus-nibbler", "42cursus-camagru", "42cursus-matcha", "42cursus-hypertube", "42cursus-red-tetris", "42cursus-darkly", "42cursus-h42n42", "42cursus-ft_hangouts", "42cursus-swifty-companion", "42cursus-swifty-proteins", "42cursus-avaj-launcher", "42cursus-swingy", "42cursus-fix-me"));
        List<Project> symfonyPool = this.getSortedProjectsBySlugs(Arrays.asList("symfony-0-oob", "symfony-1-base-symfony", "symfony-2-sql", "symfony-3-final"));
        List<Project> djangoPool = this.getSortedProjectsBySlugs(Arrays.asList("django-0-oob", "django-1-base-django", "django-2-sql", "django-3-final"));
        List<Project> rorPool = this.getSortedProjectsBySlugs(Arrays.asList("ror-0-oob", "ror-1-base-rails", "ror-2-sql", "ror-3-final"));
        List<Project> mobilePool = this.getSortedProjectsBySlugs(Arrays.asList("mobile-0-basic-of-the-mobile-application", "mobile-1-structure-and-logic", "mobile-2-api-and-data", "mobile-3-design", "mobile-4-auth-and-database", "mobile-5-manage-data-and-display"));
        List<Project> objectPool = this.getSortedProjectsBySlugs(Arrays.asList("piscine-object-module-00-encapsulation", "piscine-object-module-01-relationship", "piscine-object-module-02-uml", "piscine-object-module-03-smart", "piscine-object-module-04-design-pattern", "piscine-object-module-05-practical-work"));
        OopProjects oopProjects = new OopProjects(oop, symfonyPool, djangoPool, rorPool, mobilePool, objectPool);

        List<Project> fp = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-ft_turing", "42cursus-ft_ality", "42cursus-h42n42"));
        List<Project> ocamlPool = this.getSortedProjectsBySlugs(Arrays.asList("deprecated-piscine-ocaml"));
        FpProjects fpProjects = new FpProjects(fp, ocamlPool);

        List<Project> ip = this.getSortedProjectsBySlugs(Arrays.asList("libasm", "42cursus-zappy", "42cursus-gbmu", "42cursus-ft_linux", "42cursus-little-penguin-1", "42cursus-taskmaster", "42cursus-strace", "42cursus-malloc", "42cursus-matt-daemon", "nm", "42cursus-lem-ipc", "42cursus-kfs-1", "42cursus-kfs-2", "ft_malcolm", "42cursus-ft_ssl_md5", "42cursus-darkly", "42cursus-snow-crash", "42cursus-rainfall", "42cursus-override", "42cursus-boot2root", "42cursus-ft_shield", "42cursus-woody-woodpacker", "42cursus-famine", "42cursus-pestilence"));
        IpProjects ipProjects = new IpProjects(ip);

        return new SoftwareRncp(suiteProjects, oopProjects, fpProjects, ipProjects);
    }

    private NetworkRncp getNetworkRncp() {
        List<Project> suite = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-42sh", "42cursus-doom-nukem", "inception-of-things", "42cursus-humangl", "42cursus-kfs-2", "42cursus-override", "42cursus-pestilence", "42cursus-rt", "42cursus-total-perspective-vortex"));
        SuiteProjects suiteProjects = new SuiteProjects(suite);

        List<Project> unix = this.getSortedProjectsBySlugs(Arrays.asList("libasm", "42cursus-zappy", "42cursus-gbmu", "42cursus-little-penguin-1", "42cursus-taskmaster", "42cursus-strace", "42cursus-malloc", "42cursus-matt-daemon", "nm", "42cursus-lem-ipc", "42cursus-kfs-1", "42cursus-kfs-2", "42cursus-kfs-3", "42cursus-kfs-4", "42cursus-kfs-5", "42cursus-kfs-6", "42cursus-kfs-7", "42cursus-kfs-8", "42cursus-kfs-9", "42cursus-kfs-x"));
        UnixProjects unixProjects = new UnixProjects(unix);

        List<Project> system = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-cloud-1", "inception-of-things", "42cursus-taskmaster", "42cursus-ft_ping", "42cursus-ft_nmap", "activediscovery", "automaticdirectory", "administrativedirectory", "accessibledirectory"));
        SystemProjects systemProjects = new SystemProjects(system);

        List<Project> security = this.getSortedProjectsBySlugs(Arrays.asList("ft_malcolm", "42cursus-ft_ssl_md5", "42cursus-darkly", "42cursus-snow-crash", "42cursus-rainfall", "42cursus-override", "42cursus-boot2root", "42cursus-ft_shield", "42cursus-woody-woodpacker", "42cursus-famine", "42cursus-pestilence", "unleashthebox", "activeconnect", "microforensx", "activetechtales"));
        List<Project> securityPool = this.getSortedProjectsBySlugs(Arrays.asList("cybersecurity-stockholm-malware", "cybersecurity-arachnida-web", "cybersecurity-ft_onion-web", "cybersecurity-ft_otp-otp", "cybersecurity-inquisitor-network", "cybersecurity-reverse-me-rev", "cybersecurity-vaccine-web"));
        SecurityProjects securityProjects = new SecurityProjects(security, securityPool);

        return new NetworkRncp(suiteProjects, unixProjects, systemProjects, securityProjects);
    }

    private DatabaseRncp getDatabaseRncp() {
        List<Project> suite = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-42sh", "42cursus-doom-nukem", "inception-of-things", "42cursus-humangl", "42cursus-kfs-2", "42cursus-override", "42cursus-pestilence", "42cursus-rt", "42cursus-total-perspective-vortex"));
        SuiteProjects suiteProjects = new SuiteProjects(suite);

        List<Project> db = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-camagru", "42cursus-matcha", "42cursus-hypertube", "42cursus-red-tetris", "42cursus-darkly", "42cursus-h42n42", "tokenizer"));
        List<Project> symfonyPool = this.getSortedProjectsBySlugs(Arrays.asList("symfony-0-oob", "symfony-1-base-symfony", "symfony-2-sql", "symfony-3-final"));
        List<Project> djangoPool = this.getSortedProjectsBySlugs(Arrays.asList("django-0-oob", "django-1-base-django", "django-2-sql", "django-3-final"));
        List<Project> rorPool = this.getSortedProjectsBySlugs(Arrays.asList("ror-0-oob", "ror-1-base-rails", "ror-2-sql", "ror-3-final"));
        DbProjects dbProjects = new DbProjects(db, symfonyPool, djangoPool, rorPool);

        List<Project> ai = this.getSortedProjectsBySlugs(Arrays.asList("42cursus-ft_linear_regression", "42cursus-dslr", "42cursus-multilayer-perceptron", "42cursus-gomoku", "42cursus-total-perspective-vortex", "42cursus-expert-system", "42cursus-krpsim", "matrix", "ready-set-boole", "leaffliction"));
        List<Project> dataSciencePool = this.getSortedProjectsBySlugs(Arrays.asList("data-science-0", "data-science-1", "data-science-2", "data-science-3", "data-science-4"));
        List<Project> pythonForDataSciencePool = this.getSortedProjectsBySlugs(Arrays.asList("python-0-starting", "python-1-array", "python-2-datatable", "python-3-oop", "python-4-dod"));
        AiProjects aiProjects = new AiProjects(ai, dataSciencePool, pythonForDataSciencePool);

        return new DatabaseRncp(suiteProjects, dbProjects, aiProjects);
    }

    public Rncp getRncpProjects() {
        WebRncp webRncp = this.getWebRncp();
        SoftwareRncp softwareRncp = this.getSoftwareRncp();
        NetworkRncp networkRncp = this.getNetworkRncp();
        DatabaseRncp databaseRncp = this.getDatabaseRncp();
        
        return new Rncp(webRncp, softwareRncp, networkRncp, databaseRncp);
    }
}
