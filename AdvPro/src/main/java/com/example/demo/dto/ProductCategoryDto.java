package com.example.demo.dto;

import java.util.Date;

import com.example.demo.domain.ProductCategory;

public class ProductCategoryDto {
	private ProductDto product;
	private CategoryDto category;
private Date modifyDate;
private Date createDate;
	
	public ProductDto getProduct() {
		return product;
	}
	public void setProduct(ProductDto product) {
		this.product = product;
	}
	public CategoryDto getCategory() {
		return category;
	}
	public void setCategory(CategoryDto category) {
		this.category = category;
	}
	public ProductCategoryDto() {
		
	}
	
	
	
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public ProductCategoryDto(ProductCategory entity) {
		super();
		if (entity != null) {
			this.product = new ProductDto(entity.getProduct());
			this.category = new CategoryDto(entity.getCategory());	
			this.createDate = entity.getCreateDate();
			this.modifyDate = entity.getModifyDate();
		}
	}
}
