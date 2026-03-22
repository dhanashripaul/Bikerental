package com.bikerental.service;

import com.bikerental.entity.ContactUsQuery;
import com.bikerental.repository.ContactUsQueryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ContactUsService {

    private final ContactUsQueryRepository contactUsQueryRepository;

    public List<ContactUsQuery> getAllQueries() {
        return contactUsQueryRepository.findAll();
    }

    public Optional<ContactUsQuery> getQueryById(Integer id) {
        return contactUsQueryRepository.findById(id);
    }

    public ContactUsQuery createQuery(ContactUsQuery query) {
        return contactUsQueryRepository.save(query);
    }

    public void deleteQuery(Integer id) {
        contactUsQueryRepository.deleteById(id);
    }
}
