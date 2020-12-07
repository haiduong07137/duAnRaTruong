package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.OTP;
import com.example.demo.dto.OTPDto; 
@Repository
public interface OTPRepository extends JpaRepository<OTP, Long>{
	@Query("SELECT new com.example.demo.dto.OTPDto(entity) FROM OTP AS entity WHERE entity.token = ?1")
	public OTPDto findByToken(String token);
}
