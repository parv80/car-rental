package com.example.carrental.service;

import com.example.carrental.entity.Car;
import com.example.carrental.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {
    private final CarRepository carRepository;
    public CarService(CarRepository carRepository) { this.carRepository = carRepository; }

    public Car save(Car car) { return carRepository.save(car); }
    public List<Car> findAll() { return carRepository.findAll(); }
    public Optional<Car> findById(Long id) { return carRepository.findById(id); }

    public List<Car> search(String location, Double minPrice, Double maxPrice) {
        return carRepository.search(location, minPrice, maxPrice);
    }

    public void delete(Long id) { carRepository.deleteById(id); }
}
