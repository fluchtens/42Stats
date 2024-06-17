package com.fluchtens.stats.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
  @GetMapping("/")
  public String sayHelloWorld() {
    return "Hello World!";
  }
}
