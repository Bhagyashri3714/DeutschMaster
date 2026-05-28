package com.deutschmaster.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.deutschmaster.backend.dto.AuthResponse;
import com.deutschmaster.backend.dto.LoginRequest;
import com.deutschmaster.backend.dto.RegisterRequest;
import com.deutschmaster.backend.service.AuthService;

@RestController
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    // 🔐 REGISTER USER
    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    // 🔐 LOGIN USER
    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}