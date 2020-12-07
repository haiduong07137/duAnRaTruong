package com.example.demo.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import com.example.demo.domain.AgencyCampaign;
import com.example.demo.domain.Campaign;
import com.example.demo.domain.Product;

public class CampaignDto extends BaseObjectDto { 
	private String name;
	  
	private Double price; 
	private Date fromDate; 
	private Date toDate;
	private Long product_Id;
	
	 
	private ProductDto product;  
	private Set<AgencyCampaignDto> agency;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Date getFromDate() {
		return fromDate;
	}
	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}
	public Date getToDate() {
		return toDate;
	}
	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}
	
	public ProductDto getProduct() {
		return product;
	}
	public void setProduct(ProductDto product) {
		this.product = product;
	}
	public Set<AgencyCampaignDto> getAgency() {
		return agency;
	}
	public void setAgency(Set<AgencyCampaignDto> agency) {
		this.agency = agency;
	}
	
	
	public Long getProduct_Id() {
		return product_Id;
	}
	public void setProduct_Id(Long product_Id) {
		this.product_Id = product_Id;
	}
	public CampaignDto() {
		// TODO Auto-generated constructor stub
	}
	public CampaignDto(Campaign entity) {
		super();
		this.id = entity.getId();
		this.name = entity.getName();
		this.price = entity.getPrice();
		this.fromDate = entity.getFromDate();
		this.toDate = entity.getToDate();
		if(entity.getProduct()!=null) {
			this.product = new ProductDto(entity.getProduct());
		}

		if (entity.getAgencyCampaign() != null && entity.getAgencyCampaign().size() > 0) {
			this.agency = new HashSet<AgencyCampaignDto>();
			for (AgencyCampaign productPayout : entity.getAgencyCampaign()) { 
				AgencyCampaignDto dto = new AgencyCampaignDto(productPayout);
				this.agency.add(dto); 
			}
		}
	}
	
	
}
