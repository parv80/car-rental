package com.example.carrental.controller;

import com.example.carrental.entity.Car;
import com.example.carrental.service.CarService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {
    private final CarService carService;
    public CarController(CarService carService) { this.carService = carService; }

    @GetMapping
    public ResponseEntity<List<Car>> list(@RequestParam(required=false) String location,
                                          @RequestParam(required=false) Double minPrice,
                                          @RequestParam(required=false) Double maxPrice) {
        List<Car> cars = carService.search(location, minPrice, maxPrice);
        return ResponseEntity.ok(cars);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Car> get(@PathVariable Long id) {
        return carService.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
