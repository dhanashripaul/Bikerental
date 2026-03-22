package com.bikerental.repository;

import com.bikerental.entity.Testimonial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestimonialRepository extends JpaRepository<Testimonial, Integer> {
    List<Testimonial> findByUserEmail(String userEmail);
    List<Testimonial> findByStatus(Integer status);
}
