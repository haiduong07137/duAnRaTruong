package com.example.demo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.domain.ProductPayout;
 

public interface ProductPayoutRepository extends JpaRepository<ProductPayout, Long> {
	 
}
