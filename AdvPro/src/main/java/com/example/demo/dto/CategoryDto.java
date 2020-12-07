package com.example.demo.dto;

import java.util.HashSet;
import java.util.Set;

import com.example.demo.domain.Category;
 

public class CategoryDto extends BaseObjectDto {
	private String name;
	private String code;
	private Set<ProductDto> products;
	
	/* Getters and Setters */
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public Set<ProductDto> getProducts() {
		return products;
	}
	public void setProducts(Set<ProductDto> products) {
		this.products = products;
	}
	public CategoryDto() {
		super();
	}
	
	public CategoryDto(Category entity) {
		super();
		if (entity != null) { 
			this.id = entity.getId();
			this.name = entity.getName();
			this.code = entity.getCode();
			
			 
		}
	}
	
	public CategoryDto(Category entity, boolean simple) {
		super();
		if (entity != null) { 
			this.id = entity.getId();
			this.name = entity.getName();
			this.code = entity.getCode();
		}
	}
}
