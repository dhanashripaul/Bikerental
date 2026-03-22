package com.bikerental.service;

import com.bikerental.entity.Brand;
import com.bikerental.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BrandService {

    private final BrandRepository brandRepository;

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Optional<Brand> getBrandById(Integer id) {
        return brandRepository.findById(id);
    }

    public Brand createBrand(Brand brand) {
        return brandRepository.save(brand);
    }

    public Brand updateBrand(Integer id, Brand brandDetails) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Brand not found"));

        if (brandDetails.getBrandName() != null) {
            brand.setBrandName(brandDetails.getBrandName());
        }

        return brandRepository.save(brand);
    }

    public void deleteBrand(Integer id) {
        brandRepository.deleteById(id);
    }
}
