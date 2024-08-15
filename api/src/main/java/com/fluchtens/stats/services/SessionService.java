package com.fluchtens.stats.services;

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

    public List<Map<String, Object>> getSessions() {
        String principalName = SecurityContextHolder.getContext().getAuthentication().getName();
        String sessionQuery = "SELECT PRIMARY_ID FROM SPRING_SESSION WHERE PRINCIPAL_NAME = ?";
        List<String> primaryIds = jdbcTemplate.queryForList(sessionQuery, String.class, principalName);
        List<Map<String, Object>> sessionsWithAttributes = new ArrayList<>();
        for (String primaryId : primaryIds) {
            Map<String, Object> attributesMap = new HashMap<>();
            Object ipAddress = httpSession.getAttribute("IP_ADDRESS");
            if (ipAddress != null) {
                attributesMap.put("ip_address", ipAddress);
            }
            Object device = httpSession.getAttribute("DEVICE");
            if (device != null) {
                attributesMap.put("device", device);
            }
            Map<String, Object> sessionWithAttributes = new HashMap<>();
            sessionWithAttributes.put("id", primaryId);
            sessionWithAttributes.put("attributes", attributesMap);
            sessionsWithAttributes.add(sessionWithAttributes);
        }
        return sessionsWithAttributes;
    }

    public JsonResponse deleteSession(String primaryId) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        String sessionQuery = "SELECT PRINCIPAL_NAME FROM SPRING_SESSION WHERE PRIMARY_ID = ?";
        try {
            String sessionPrincipalName = jdbcTemplate.queryForObject(sessionQuery, String.class, primaryId);
            if (!userId.equals(sessionPrincipalName)) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You are not authorized to delete this session");
            }
        } catch (EmptyResultDataAccessException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found");
        }
        String deleteSessionQuery = "DELETE FROM SPRING_SESSION WHERE PRIMARY_ID = ?";
        int rowsAffected = jdbcTemplate.update(deleteSessionQuery, primaryId);
        if (rowsAffected == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Session not found");
        }
        return new JsonResponse("Device successfully disconnected");
    }
}
