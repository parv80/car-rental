package com.example.carrental.service;

import com.example.carrental.entity.Booking;
import com.example.carrental.entity.Car;
import com.example.carrental.entity.User;
import com.example.carrental.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    public BookingService(BookingRepository bookingRepository) { this.bookingRepository = bookingRepository; }

    public Booking create(Booking booking) {
        // simple persist; you can add availability checks
        booking.setStatus("CONFIRMED");
        return bookingRepository.save(booking);
    }

    public List<Booking> findByUser(User user) {
        return bookingRepository.findByUser(user);
    }

    public List<Booking> findAll() { return bookingRepository.findAll(); }

    public void cancel(Long id) {
        bookingRepository.findById(id).ifPresent(b -> {
            b.setStatus("CANCELLED");
            bookingRepository.save(b);
        });
    }
}
