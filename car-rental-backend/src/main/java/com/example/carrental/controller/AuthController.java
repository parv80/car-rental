package com.example.carrental.controller;

import com.example.carrental.dto.AuthRequest;
import com.example.carrental.dto.AuthResponse;
import com.example.carrental.entity.User;
import com.example.carrental.service.UserService;
import com.example.carrental.util.JwtUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest req) {
        boolean isAdmin = Optional.ofNullable(req.getIsAdmin()).orElse(false);
        userService.register(req.getFullName(), req.getEmail(), req.getPassword(), isAdmin);
        return ResponseEntity.ok(Map.of("message", "registered"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        var userOpt = userService.findByEmail(req.getEmail());
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

        var user = userOpt.get();

   
        if (!userService.checkPassword(req.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        }

     
        Map<String,Object> claims = new HashMap<>();
        claims.put("roles", new ArrayList<>(user.getRoles()));
        String token = jwtUtil.generateToken(user.getEmail(), claims);

        return ResponseEntity.ok(new AuthResponse(token, user.getEmail(), user.getFullName()));
    }
}
