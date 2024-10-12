package com.fluchtens.stats.core;

public class JsonResponse {
    private String message;

    public JsonResponse() {
    }

    public JsonResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
