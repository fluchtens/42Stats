package com.fluchtens.stats.tasks.sessions;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class SessionCleanup {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Scheduled(cron = "0 0 0 1 * ?")
    public void cleanupSessions() {
        try {
            String query = "DELETE FROM SPRING_SESSION";
            int rowsAffected = jdbcTemplate.update(query);

            System.out.println(rowsAffected + " sessions have been deleted from the database.");
        } catch (Exception e) {
            System.err.println("Failed to delete sessions: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
