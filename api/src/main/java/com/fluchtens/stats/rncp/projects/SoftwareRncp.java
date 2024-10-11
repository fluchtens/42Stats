package com.fluchtens.stats.rncp.projects;

import com.fluchtens.stats.rncp.projects.software.FpProjects;
import com.fluchtens.stats.rncp.projects.software.IpProjects;
import com.fluchtens.stats.rncp.projects.software.OopProjects;
import com.fluchtens.stats.rncp.projects.suite.SuiteProjects;

public class SoftwareRncp {
    private SuiteProjects suite;
    private OopProjects oop;
    private FpProjects fp;
    private IpProjects ip;

    public SoftwareRncp() {}

    public SoftwareRncp(SuiteProjects suite, OopProjects oop, FpProjects fp, IpProjects ip) {
        this.suite = suite;
        this.oop = oop;
        this.fp = fp;
        this.ip = ip;
    }

    public SuiteProjects getSuite() {
        return this.suite;
    }

    public void setSuite(SuiteProjects suite) {
        this.suite = suite;
    }

    public OopProjects getOop() {
        return this.oop;
    }

    public void setOop(OopProjects oop) {
        this.oop = oop;
    }

    public FpProjects getFp() {
        return this.fp;
    }

    public void setFp(FpProjects fp) {
        this.fp = fp;
    }

    public IpProjects getIp() {
        return this.ip;
    }

    public void setIp(IpProjects ip) {
        this.ip = ip;
    }
}
