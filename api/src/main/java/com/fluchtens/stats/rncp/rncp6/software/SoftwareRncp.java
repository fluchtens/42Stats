package com.fluchtens.stats.rncp.rncp6.software;

import com.fluchtens.stats.rncp.SuiteProjects;

public class SoftwareRncp {
    private SuiteProjects suite;
    private OopProjects oop;

    public SoftwareRncp() {}

    public SoftwareRncp(SuiteProjects suite, OopProjects oop) {
        this.suite = suite;
        this.oop = oop;
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
}
