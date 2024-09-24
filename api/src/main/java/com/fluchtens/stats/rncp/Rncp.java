package com.fluchtens.stats.rncp;

public class Rncp {
    private WebRncp web;
    private MobileRncp mobile;
    private SuiteRncp suite;

    public Rncp() {}

    public Rncp(WebRncp web, MobileRncp mobile, SuiteRncp suite) {
        this.web = web;
        this.mobile = mobile;
        this.suite = suite;
    }

    public WebRncp getWeb() {
        return web;
    }

    public void setWeb(WebRncp web) {
        this.web = web;
    }

    public MobileRncp getMobile() {
        return mobile;
    }

    public void setMobile(MobileRncp mobile) {
        this.mobile = mobile;
    }

    public SuiteRncp getSuite() {
        return suite;
    }

    public void setSuite(SuiteRncp suite) {
        this.suite = suite;
    }
}
