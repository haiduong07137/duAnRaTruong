package com.example.demo.dto;

import com.example.demo.domain.AgencyCampaign;

public class AgencyCampaignDto {
	private ProductDto product;
	private AgencyDto agency;
	 
	 
	public ProductDto getProduct() {
		return product;
	}


	public void setProduct(ProductDto product) {
		this.product = product;
	}


 


	public AgencyDto getAgency() {
		return agency;
	}


	public void setAgency(AgencyDto agency) {
		this.agency = agency;
	}


	public AgencyCampaignDto(AgencyCampaign  entity) {
		super();
		if (entity != null) {
			this.product = new ProductDto(entity.getProduct(),true);
			this.agency = new AgencyDto(entity.getAgency(),true); 
		}
	}
}
