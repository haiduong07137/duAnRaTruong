package com.example.demo.dto.seachdto;

import java.util.Set;

public class ProductSearchDto extends SearchDto {
	private Long userId;
	private String name;
	private String code;
	private Double price;
	private Set<String> categories;
	private Set<String> locations;
	private Set<String> conversionTypes;
	
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Set<String> getConversionTypes() {
		return conversionTypes;
	}
	public void setConversionTypes(Set<String> conversionTypes) {
		this.conversionTypes = conversionTypes;
	}
	public Set<String> getCategories() {
		return categories;
	}
	public void setCategories(Set<String> categories) {
		this.categories = categories;
	}
	public Set<String> getLocations() {
		return locations;
	}
	public void setLocations(Set<String> locations) {
		this.locations = locations;
	}
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
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
}
