package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Agency;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.UserDto; 

@Repository
public interface AgencyRepository extends JpaRepository<Agency, Long>{
	@Query("select new com.example.demo.dto.AgencyDto(a) FROM Agency a")
	List<AgencyDto> getAll();
	
	
	@Query("select p FROM User p where p.email = ?1 " )
	List<UserDto> findByEmail(String email);

	
	@Query("select p FROM User p where p.username = ?1 " )
	List<UserDto> findByUsername(String username);
	 
	 
}
