package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Product;
 

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
	@Query("select p FROM Product p where p.code = ?1 " )
	List<Product> findByCode(String code);
//	@Query("select distinct p.location FROM Product p where p.location = ?1")
////	List<String> getLocationList(String[] locations);
//
//	List<String> getLocationList(String[] locations);
}
