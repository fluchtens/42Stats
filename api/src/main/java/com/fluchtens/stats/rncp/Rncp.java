package com.fluchtens.stats.rncp;

import com.fluchtens.stats.rncp.rncp6.software.SoftwareRncp;
import com.fluchtens.stats.rncp.rncp6.web.WebRncp;

public class Rncp {
    private WebRncp web;
    private SoftwareRncp software;

    public Rncp() {}

    public Rncp(WebRncp web, SoftwareRncp software) {
        this.web = web;
        this.software = software;
    }

    public WebRncp getWeb() {
        return web;
    }

    public void setWeb(WebRncp web) {
        this.web = web;
    }

    public SoftwareRncp getSoftware() {
        return software;
    }

    public void setSoftware(SoftwareRncp software) {
        this.software = software;
    }
}
