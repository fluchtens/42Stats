package com.fluchtens.stats.services;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
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

@Service
public class SessionService {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    private Object deserialize(byte[] bytes) {
        try (ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
            ObjectInputStream ois = new ObjectInputStream(bis)) {
            return ois.readObject();
        } catch (IOException | ClassNotFoundException e) {
            throw new RuntimeException("Erreur lors de la désérialisation de l'objet", e);
        }
    }

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

            String attributesQuery = "SELECT ATTRIBUTE_NAME, ATTRIBUTE_BYTES FROM SPRING_SESSION_ATTRIBUTES WHERE SESSION_PRIMARY_ID = ? AND ATTRIBUTE_NAME IN ('browser', 'device', 'ip', 'os')";
            List<Map<String, Object>> attributesList = jdbcTemplate.queryForList(attributesQuery, primaryId);
            Map<String, Object> attributesMap = new HashMap<>();

            for (Map<String, Object> attribute : attributesList) {
                String attributeName = (String) attribute.get("ATTRIBUTE_NAME");
                byte[] attributeBytes = (byte[]) attribute.get("ATTRIBUTE_BYTES");
                Object attributeValue = deserialize(attributeBytes);
                attributesMap.put(attributeName, attributeValue);
            }

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
