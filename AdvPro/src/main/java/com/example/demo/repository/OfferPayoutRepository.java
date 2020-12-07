package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.OfferPayout;
 

@Repository
public interface OfferPayoutRepository extends JpaRepository<OfferPayout, Long>{

	
	 
}
