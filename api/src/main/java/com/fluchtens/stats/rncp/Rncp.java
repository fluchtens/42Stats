package com.fluchtens.stats.rncp;

import com.fluchtens.stats.rncp.projects.NetworkRncp;
import com.fluchtens.stats.rncp.projects.SoftwareRncp;
import com.fluchtens.stats.rncp.projects.WebRncp;

public class Rncp {
    private WebRncp web;
    private SoftwareRncp software;
    private NetworkRncp network;

    public Rncp() {}

    public Rncp(WebRncp web, SoftwareRncp software, NetworkRncp network) {
        this.web = web;
        this.software = software;
        this.network = network;
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

    public NetworkRncp getNetwork() {
        return network;
    }

    public void setNetwork(NetworkRncp network) {
        this.network = network;
    }
}
