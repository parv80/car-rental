package com.example.carrental.controller;

import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import com.example.carrental.repository.CarRepository;
import com.example.carrental.service.BookingService;
import com.example.carrental.service.CarService;
import com.example.carrental.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final CarService carService;
    private final BookingService bookingService;
    private final UserService userService;
    private final CarRepository carRepository;

    public AdminController(CarService carService,
                           BookingService bookingService,
                           UserService userService,
                           CarRepository carRepository) {
        this.carService = carService;
        this.bookingService = bookingService;
        this.userService = userService;
        this.carRepository = carRepository;
    }

    // ✅ Admin-specific cars
    @GetMapping("/my-cars")
    public List<Car> getAdminCars(@AuthenticationPrincipal UserDetails userDetails) {
        User admin = userService.findByEmail(userDetails.getUsername())
                                .orElseThrow(() -> new RuntimeException("Admin not found"));
        return carRepository.findAllByAdmin(admin);
    }

    // ✅ Admin stats
    @GetMapping("/stats")
    public ResponseEntity<?> stats(@AuthenticationPrincipal UserDetails userDetails) {
        User admin = userService.findByEmail(userDetails.getUsername())
                                .orElseThrow(() -> new RuntimeException("Admin not found"));

        Map<String, Object> m = new HashMap<>();
        // Count only cars belonging to this admin
        m.put("totalCars", carRepository.findAllByAdmin(admin).size());
        // Count bookings of all cars, or filter by admin if you store booking-admin link
        m.put("totalBookings", bookingService.findAll().size());
        return ResponseEntity.ok(m);
    }

    // ✅ All cars (for super-admin or public view)
    @GetMapping("/cars")
    public ResponseEntity<?> allCars() {
        return ResponseEntity.ok(carService.findAll());
    }

    // ✅ Add a car and associate with logged-in admin
    @PostMapping("/cars")
    public Car addCar(@RequestBody Car car, @AuthenticationPrincipal UserDetails userDetails) {
        User admin = userService.findByEmail(userDetails.getUsername())
                                .orElseThrow(() -> new RuntimeException("Admin not found"));
        car.setAdmin(admin);
        return carRepository.save(car);
    }

    // ✅ Update car (any car can be updated, could add admin check if needed)
    @PutMapping("/cars/{id}")
    public ResponseEntity<?> updateCar(@PathVariable Long id, @RequestBody Car car) {
        return carService.findById(id).map(existing -> {
            existing.setMake(car.getMake());
            existing.setModel(car.getModel());
            existing.setLocation(car.getLocation());
            existing.setPricePerDay(car.getPricePerDay());
            existing.setDescription(car.getDescription());
            existing.setStatus(car.getStatus());
            existing.setImageUrl(car.getImageUrl());
            return ResponseEntity.ok(carService.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    // ✅ Delete car
    @DeleteMapping("/cars/{id}")
    public ResponseEntity<?> deleteCar(@PathVariable Long id) {
        carService.delete(id);
        return ResponseEntity.ok(Map.of("deleted", true));
    }
}
