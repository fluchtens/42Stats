package com.fluchtens.stats.rncp;

public class Rncp {
    private WebRncp web;
    private MobileRncp mobile;

    public Rncp() {}

    public Rncp(WebRncp web, MobileRncp mobile) {
        this.web = web;
        this.mobile = mobile;
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
}
