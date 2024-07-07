package com.fluchtens.stats.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fluchtens.stats.JsonResponse;

@RestController
public class HomeController {
  @GetMapping("/")
  public JsonResponse sayHelloWorld() {
    return new JsonResponse("Hello World!");
  }
}
