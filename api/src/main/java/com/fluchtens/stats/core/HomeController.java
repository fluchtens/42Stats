package com.fluchtens.stats.core;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
  @GetMapping("/")
  public JsonResponse sayHelloWorld() {
    return new JsonResponse("Hello World!");
  }
}
