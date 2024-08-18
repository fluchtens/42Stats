package com.fluchtens.stats.services;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.fluchtens.stats.JsonResponse;

import jakarta.servlet.http.HttpSession;

@Service
public class SessionService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private HttpSession httpSession;

    public List<Map<String, Object>> getSessions(String currentSessionId) {
        String principalName = SecurityContextHolder.getContext().getAuthentication().getName();
    
        String sessionsQuery = "SELECT PRIMARY_ID, SESSION_ID, CREATION_TIME, EXPIRY_TIME FROM SPRING_SESSION WHERE PRINCIPAL_NAME = ?";
        List<Map<String, Object>> sessions = jdbcTemplate.queryForList(sessionsQuery, principalName);
        List<Map<String, Object>> sessionsWithAttributes = new ArrayList<>();
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("d MMMM yyyy");

        for (Map<String, Object> session : sessions) {
            String primaryId = (String) session.get("PRIMARY_ID");
            String sessionId = (String) session.get("SESSION_ID");

            Long creationTimeMillis = (Long) session.get("CREATION_TIME");
            LocalDateTime creationDateTime = Instant.ofEpochMilli(creationTimeMillis).atZone(ZoneId.systemDefault()).toLocalDateTime();
            String formattedCreationDate = creationDateTime.format(dateFormatter);

            Long expiryTimeMillis = (Long) session.get("EXPIRY_TIME");
            LocalDateTime expiryDateTime = Instant.ofEpochMilli(expiryTimeMillis).atZone(ZoneId.systemDefault()).toLocalDateTime();
            String formattedExpiryDate = expiryDateTime.format(dateFormatter);
            
            boolean isCurrentSession = currentSessionId.equals(sessionId);

            Map<String, Object> attributesMap = new HashMap<>();
            Object ip = httpSession.getAttribute("IP");
            Object browser = httpSession.getAttribute("BROWSER");
            Object os = httpSession.getAttribute("OS");
            Object device = httpSession.getAttribute("DEVICE");
            attributesMap.put("ip", ip);
            attributesMap.put("browser", browser);
            attributesMap.put("os", os);
            attributesMap.put("device", device);
    
            Map<String, Object> sessionWithAttributes = new HashMap<>();
            sessionWithAttributes.put("primary_id", primaryId);
            sessionWithAttributes.put("session_id", sessionId);
            sessionWithAttributes.put("creation_date", formattedCreationDate);
            sessionWithAttributes.put("expiry_date", formattedExpiryDate);
            sessionWithAttributes.put("current", isCurrentSession);
            sessionWithAttributes.put("attributes", attributesMap);
            sessionsWithAttributes.add(sessionWithAttributes);
        }
        return sessionsWithAttributes;
    }

    public JsonResponse deleteSession(String primaryId, String sessionId) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        String sessionQuery = "SELECT PRINCIPAL_NAME FROM SPRING_SESSION WHERE PRIMARY_ID = ?";
        try {
            String sessionPrincipalName = this.jdbcTemplate.queryForObject(sessionQuery, String.class, primaryId);
            if (!userId.equals(sessionPrincipalName)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this session");
            }
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found");
        }

        String sessionIdQuery = "SELECT SESSION_ID FROM SPRING_SESSION WHERE PRIMARY_ID = ?";
        try {
            String targetSessionId = this.jdbcTemplate.queryForObject(sessionIdQuery, String.class, primaryId);
            if (sessionId.equals(targetSessionId)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cannot delete your current session");
            }
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found");
        }

        String deleteSessionQuery = "DELETE FROM SPRING_SESSION WHERE PRIMARY_ID = ?";
        int rowsAffected = this.jdbcTemplate.update(deleteSessionQuery, primaryId);
        if (rowsAffected == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found");
        }
        return new JsonResponse("Device successfully disconnected");
    }
}
