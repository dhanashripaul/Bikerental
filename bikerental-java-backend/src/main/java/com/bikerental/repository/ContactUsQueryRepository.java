package com.bikerental.repository;

import com.bikerental.entity.ContactUsQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactUsQueryRepository extends JpaRepository<ContactUsQuery, Integer> {
}
