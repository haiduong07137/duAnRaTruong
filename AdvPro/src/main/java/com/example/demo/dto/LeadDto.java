package com.example.demo.dto;

import com.example.demo.domain.Lead;

public class LeadDto extends BaseObjectDto {
 
	private Long idOffer;
	
	private String name;
	 
	private String phone;
	 
	private String message;
	  
	private OfferDto offer;
	
	

	 

	public Long getIdOffer() {
		return idOffer;
	}

	public void setIdOffer(Long idOffer) {
		this.idOffer = idOffer;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public OfferDto getOffer() {
		return offer;
	}

	public void setOffer(OfferDto offer) {
		this.offer = offer;
	}

	 
	public LeadDto() {
		// TODO Auto-generated constructor stub
	}

	public LeadDto(Lead entity) {
		this.id = entity.getId();
		this.name = entity.getName();
		this.phone = entity.getPhone();
		this.message = entity.getMessage();
		this.offer = new OfferDto(entity.getOffer());
	}
	
	public LeadDto(Lead entity,Boolean check) {
		this.name = entity.getName();
		this.phone = entity.getPhone();
		this.message = entity.getMessage();
		this.id = entity.getId();	
//		this.offer = new OfferDto(entity.getOffer());
	}
	
	
 
	 

}
