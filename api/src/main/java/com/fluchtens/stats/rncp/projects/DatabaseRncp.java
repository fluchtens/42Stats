package com.fluchtens.stats.rncp.projects;

import com.fluchtens.stats.rncp.projects.database.AiProjects;
import com.fluchtens.stats.rncp.projects.database.DbProjects;
import com.fluchtens.stats.rncp.projects.suite.SuiteProjects;

public class DatabaseRncp {
    private SuiteProjects suite;
    private DbProjects db;
    private AiProjects ai;

    public DatabaseRncp() {}

    public DatabaseRncp(SuiteProjects suite, DbProjects db, AiProjects ai) {
        this.suite = suite;
        this.db = db;
        this.ai = ai;
    }

    public SuiteProjects getSuite() {
        return this.suite;
    }

    public void setSuite(SuiteProjects suite) {
        this.suite = suite;
    }

    public DbProjects getDb() {
        return this.db;
    }

    public void setDb(DbProjects db) {
        this.db = db;
    }

    public AiProjects getAi() {
        return this.ai;
    }

    public void setAi(AiProjects ai) {
        this.ai = ai;
    }
}
