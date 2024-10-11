package com.fluchtens.stats.rncp.rncp6.web;

import com.fluchtens.stats.rncp.SuiteProjects;

public class WebRncp {
    private SuiteProjects suite;
    private WebProjects web;
    private MobilePoolProjects mobile;

    public WebRncp() {}

    public WebRncp(SuiteProjects suite, WebProjects web, MobilePoolProjects mobile) {
        this.suite = suite;
        this.web = web;
        this.mobile = mobile;
    }

    public SuiteProjects getSuite() {
        return this.suite;
    }

    public void setSuite(SuiteProjects suite) {
        this.suite = suite;
    }

    public WebProjects getWeb() {
        return this.web;
    }

    public void setWeb(WebProjects web) {
        this.web = web;
    }

    public MobilePoolProjects getMobile() {
        return this.mobile;
    }

    public void setMobile(MobilePoolProjects mobile) {
        this.mobile = mobile;
    }
}
