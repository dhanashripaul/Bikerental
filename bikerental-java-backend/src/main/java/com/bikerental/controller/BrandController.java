package com.bikerental.controller;

import com.bikerental.dto.ApiResponse;
import com.bikerental.entity.Brand;
import com.bikerental.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:8080"})
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<List<Brand>> getAllBrands() {
        return ResponseEntity.ok(brandService.getAllBrands());
    }

    @GetMapping("/{brandId}")
    public ResponseEntity<Brand> getBrandById(@PathVariable Integer brandId) {
        Optional<Brand> brand = brandService.getBrandById(brandId);
        return brand.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        try {
            Brand createdBrand = brandService.createBrand(brand);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBrand);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PutMapping("/{brandId}")
    public ResponseEntity<ApiResponse> updateBrand(
            @PathVariable Integer brandId,
            @RequestBody Brand brandDetails) {
        try {
            brandService.updateBrand(brandId, brandDetails);
            return ResponseEntity.ok(new ApiResponse(true, "Brand updated successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        }
    }

    @DeleteMapping("/{brandId}")
    public ResponseEntity<ApiResponse> deleteBrand(@PathVariable Integer brandId) {
        try {
            brandService.deleteBrand(brandId);
            return ResponseEntity.ok(new ApiResponse(true, "Brand deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, "Failed to delete brand"));
        }
    }
}
