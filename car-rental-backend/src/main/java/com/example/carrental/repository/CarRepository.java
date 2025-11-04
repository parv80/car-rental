package com.example.carrental.repository;
import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findByLocationContainingIgnoreCase(String location);

    @Query("SELECT c FROM Car c WHERE (:location IS NULL OR lower(c.location) like lower(concat('%',:location,'%'))) AND (:minPrice IS NULL OR c.pricePerDay >= :minPrice) AND (:maxPrice IS NULL OR c.pricePerDay <= :maxPrice)")
    List<Car> search(String location, Double minPrice, Double maxPrice);
    List<Car> findAllByAdmin(User admin);

}
