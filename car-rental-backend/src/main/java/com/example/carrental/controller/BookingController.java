package com.example.carrental.controller;

import com.example.carrental.dto.BookingRequest;
import com.example.carrental.entity.Booking;
import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import com.example.carrental.repository.CarRepository;
import com.example.carrental.repository.UserRepository;
import com.example.carrental.service.BookingService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.temporal.ChronoUnit;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {
    private final BookingService bookingService;
    private final UserRepository userRepository;
    private final CarRepository carRepository;

    public BookingController(BookingService bookingService, UserRepository userRepository, CarRepository carRepository) {
        this.bookingService = bookingService;
        this.userRepository = userRepository;
        this.carRepository = carRepository;
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody BookingRequest req, Authentication auth) {
        String email = auth.getName();
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("Invalid user");

        Optional<Car> carOpt = carRepository.findById(req.getCarId());
        if (carOpt.isEmpty()) return ResponseEntity.badRequest().body("Invalid car");

        Car car = carOpt.get();
        long days = ChronoUnit.DAYS.between(req.getStartDate(), req.getEndDate());
        if (days <= 0) days = 1;
        double total = days * car.getPricePerDay();
        Booking booking = new Booking();
        booking.setUser(userOpt.get());
        booking.setCar(car);
        booking.setStartDate(req.getStartDate());
        booking.setEndDate(req.getEndDate());
        booking.setTotalAmount(total);
        booking.setPaymentReference("SIM-" + System.currentTimeMillis());
        Booking saved = bookingService.create(booking);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/my")
    public ResponseEntity<?> myBookings(Authentication auth) {
        String email = auth.getName();
        var userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) return ResponseEntity.status(401).body("Invalid user");
        return ResponseEntity.ok(bookingService.findByUser(userOpt.get()));
    }
}
