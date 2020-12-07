package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.AgencyUser;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.AgencyUserDto;
import com.example.demo.dto.UserDto; 

@Repository
public interface AgencyUserRepository extends JpaRepository<AgencyUser , UUID>{
	

}
