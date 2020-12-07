package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Agency;
import com.example.demo.domain.User;
import com.example.demo.dto.AgencyDto; 

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	@Query("select c FROM User c where c.username = ?1 ")
	User findByUsername(String username);

	@Query("select c FROM User c where c.password = ?1 ")
	User findByPassword(String password);

}
