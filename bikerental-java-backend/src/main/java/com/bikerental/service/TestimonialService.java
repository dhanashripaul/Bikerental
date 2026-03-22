package com.bikerental.service;

import com.bikerental.entity.Testimonial;
import com.bikerental.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TestimonialService {

    private final TestimonialRepository testimonialRepository;

    public List<Testimonial> getAllTestimonials() {
        return testimonialRepository.findAll();
    }

    public List<Testimonial> getApprovedTestimonials() {
        return testimonialRepository.findByStatus(1);
    }

    public Optional<Testimonial> getTestimonialById(Integer id) {
        return testimonialRepository.findById(id);
    }

    public List<Testimonial> getTestimonialsByUserEmail(String userEmail) {
        return testimonialRepository.findByUserEmail(userEmail);
    }

    public Testimonial createTestimonial(Testimonial testimonial) {
        return testimonialRepository.save(testimonial);
    }

    public Testimonial approveTestimonial(Integer id) {
        Testimonial testimonial = testimonialRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Testimonial not found"));
        testimonial.setStatus(1);
        return testimonialRepository.save(testimonial);
    }

    public void deleteTestimonial(Integer id) {
        testimonialRepository.deleteById(id);
    }
}
