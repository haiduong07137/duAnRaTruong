package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Agency;
import com.example.demo.domain.Role;
import com.example.demo.domain.User;
import com.example.demo.dto.AgencyDto; 

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

	 

}
