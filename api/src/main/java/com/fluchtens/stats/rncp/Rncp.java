package com.fluchtens.stats.rncp;

import java.util.List;

import com.fluchtens.stats.models.Project;

public class Rncp {
    private WebRncp web;
    private List<Project> mobile;

    public Rncp() {}

    public Rncp(WebRncp web, List<Project> mobile) {
        this.web = web;
        this.mobile = mobile;
    }

    public WebRncp getWeb() {
        return web;
    }

    public void setWeb(WebRncp web) {
        this.web = web;
    }

    public List<Project> getMobile() {
        return mobile;
    }

    public void setMobile(List<Project> mobile) {
        this.mobile = mobile;
    }
}
