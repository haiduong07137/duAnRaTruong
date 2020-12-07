package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.domain.ValidateOffer;

public interface ValidateOfferRepository extends JpaRepository<ValidateOffer, Long> {
	ValidateOffer findByValue(String value);
}
