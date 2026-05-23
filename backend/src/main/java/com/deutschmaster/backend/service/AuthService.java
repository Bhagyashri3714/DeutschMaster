package com.deutschmaster.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.deutschmaster.backend.dto.AuthResponse;
import com.deutschmaster.backend.dto.LoginRequest;
import com.deutschmaster.backend.dto.RegisterRequest;
import com.deutschmaster.backend.entity.User;
import com.deutschmaster.backend.repo.UserRepo;
import com.deutschmaster.backend.security.JwtUtil;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepo repo;

    @Autowired
    private PasswordEncoder passwordEncoder;  // ✅ FIX HERE

    // REGISTER
    public String register(RegisterRequest request) {

        if (repo.findByUsername(request.getUsername()).isPresent()) {
            return "User already exists";
        }

        User user = new User();
        user.setUsername(request.getUsername());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        // ROLE DECIDED DURING REGISTRATION
        user.setRole(request.getRole());

        repo.save(user);

        return "User registered successfully";
    }
    
    public AuthResponse login(LoginRequest request) {

        User user = repo.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // MUST be ROLE_USER / ROLE_ADMIN
        String role = user.getRole();

        String token = JwtUtil.generateToken(user.getUsername(), role);

        return new AuthResponse(token, role);
    }
}