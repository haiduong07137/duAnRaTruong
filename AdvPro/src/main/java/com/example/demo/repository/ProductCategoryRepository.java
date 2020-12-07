package com.example.demo.repository;

import java.util.List; 

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.ProductCategory;
 

@Repository
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
	@Query("SELECT entity FROM ProductCategory entity WHERE entity.category.id = ?1 AND entity.product.id = ?2")
	public ProductCategory getProductCategoryFromCategoryIdAndProductId(Long categoryId, Long productId);
	
	@Query("select entity.id From ProductCategory entity WHERE product.id = ?1")
	public List<Long> getProductCategoryFromProductId(Long productId);
	



}
