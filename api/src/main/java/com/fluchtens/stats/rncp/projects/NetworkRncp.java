package com.fluchtens.stats.rncp.projects;

import com.fluchtens.stats.rncp.projects.network.SecurityProjects;
import com.fluchtens.stats.rncp.projects.network.SystemProjects;
import com.fluchtens.stats.rncp.projects.network.UnixProjects;
import com.fluchtens.stats.rncp.projects.suite.SuiteProjects;

public class NetworkRncp {
    private SuiteProjects suite;
    private UnixProjects unix;
    private SystemProjects system;
    private SecurityProjects security;

    public NetworkRncp() {}

    public NetworkRncp(SuiteProjects suite, UnixProjects unix, SystemProjects system, SecurityProjects security) {
        this.suite = suite;
        this.unix = unix;
        this.system = system;
        this.security = security;
    }

    public SuiteProjects getSuite() {
        return this.suite;
    }

    public void setSuite(SuiteProjects suite) {
        this.suite = suite;
    }

    public UnixProjects getUnix() {
        return this.unix;
    }

    public void setUnix(UnixProjects unix) {
        this.unix = unix;
    }

    public SystemProjects getSystem() {
        return this.system;
    }

    public void setSystem(SystemProjects system) {
        this.system = system;
    }

    public SecurityProjects getSecurity() {
        return this.security;
    }

    public void setSecurity(SecurityProjects security) {
        this.security = security;
    }
}
