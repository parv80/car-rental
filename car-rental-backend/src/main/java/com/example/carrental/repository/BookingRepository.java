package com.example.carrental.repository;
import com.example.carrental.entity.Booking;
import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByUser(User user);
    
}
