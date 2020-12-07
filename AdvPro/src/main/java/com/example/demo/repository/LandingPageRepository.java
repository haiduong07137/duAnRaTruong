package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.domain.LandingPage;
 

public interface LandingPageRepository extends JpaRepository<LandingPage, Long>{
	@Query("select entity.id From LandingPage entity WHERE product.id = ?1")
	public List<Long> getLandingPages(Long productID);
}
