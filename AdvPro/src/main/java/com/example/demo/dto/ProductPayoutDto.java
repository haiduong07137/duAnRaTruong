package com.example.demo.dto;

import com.example.demo.domain.ProductPayout;

public class ProductPayoutDto extends BaseObjectDto {

	private ProductDto product;
	
	private Double payoutValue;
	
	private Boolean isCurrent;

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
	}

	public Double getPayoutValue() {
		return payoutValue;
	}

	public void setPayoutValue(Double payoutValue) {
		this.payoutValue = payoutValue;
	}

	public Boolean getIsCurrent() {
		return isCurrent;
	}

	public void setIsCurrent(Boolean isCurrent) {
		this.isCurrent = isCurrent;
	}
	public ProductPayoutDto() {
		
	}
	
	public ProductPayoutDto(ProductPayout entity) {
		this.id = entity.getId();
//		if (entity.getProduct() != null) {
//			this.product = new ProductDto(entity.getProduct(), true);			
//		}
		this.payoutValue = entity.getPayoutValue();
		this.isCurrent = entity.getIsCurrent();
	}
	public ProductPayoutDto(ProductPayout entity,boolean check) {
		this.id = entity.getId(); 
		this.payoutValue = entity.getPayoutValue();
		this.isCurrent = entity.getIsCurrent();
	}
}
