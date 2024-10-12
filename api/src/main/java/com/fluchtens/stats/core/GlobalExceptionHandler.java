package com.fluchtens.stats.core;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.HttpServletRequest;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<JsonResponse> handleMethodArgumentTypeMismatch(MethodArgumentTypeMismatchException ex) {
        String errMsg = ex.getMessage();
        JsonResponse response = new JsonResponse(errMsg);
        return new ResponseEntity<JsonResponse>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<JsonResponse> handleResponseStatusException(ResponseStatusException ex, HttpServletRequest request) {
        String errMsg = ex.getReason();
        JsonResponse response = new JsonResponse(errMsg);
        return new ResponseEntity<>(response, ex.getStatusCode());
    }
}
