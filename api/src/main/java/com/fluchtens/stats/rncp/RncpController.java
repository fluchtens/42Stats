package com.fluchtens.stats.rncp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RncpController {
    @Autowired
    RncpService rncpService;

    @GetMapping("/rncp")
    public Rncp getRncpProjects() {
        return this.rncpService.getRncpProjects();
    }
}
