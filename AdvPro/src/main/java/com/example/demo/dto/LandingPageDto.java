package com.example.demo.dto;

import com.example.demo.domain.LandingPage;

public class LandingPageDto extends BaseObjectDto{
	private ProductDto product;
	private String type; // LANDINGPAGE, PRELANDINGPAGE
	private String url;
	private Boolean isShow;
	
	public ProductDto getProduct() {
		return product;
	}
	public void setProduct(ProductDto product) {
		this.product = product;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public Boolean getIsShow() {
		return isShow;
	}
	public void setIsShow(Boolean isShow) {
		this.isShow = isShow;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public LandingPageDto() {
		
	}
	
	public LandingPageDto(LandingPage entity) {
		if (entity.getProduct() != null) {
			this.product = new ProductDto(entity.getProduct(), true);
		}
		this.type = entity.getType();
		this.isShow = entity.getIsShow();
		this.url = entity.getUrl();
	}
}
