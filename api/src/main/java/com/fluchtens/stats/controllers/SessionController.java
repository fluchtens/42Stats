package com.fluchtens.stats.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.JsonResponse;
import com.fluchtens.stats.services.SessionService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/sessions")
public class SessionController {
    @Autowired
    private SessionService sessionService;
    
    @GetMapping()
    public List<Map<String, Object>> getSessions(HttpSession session) {
        return this.sessionService.getSessions(session.getId());
    }

    @DeleteMapping("/{id}")
    public JsonResponse deleteSession(@PathVariable String id, HttpSession session) {
        return this.sessionService.deleteSession(id, session.getId());
    }
}
