package com.example.demo.dto;

import com.example.demo.domain.Lead;
import com.example.demo.domain.ValidateOffer;

public class ValidateDto extends BaseObjectDto{
	private Long idOffer;

	private String keyLock;

	private String value;

	private OfferDto offer;

	public Long getIdOffer() {
		return idOffer;
	}

	public void setIdOffer(Long idOffer) {
		this.idOffer = idOffer;
	}

	public String getKeyLock() {
		return keyLock;
	}

	public void setKeyLock(String keyLock) {
		this.keyLock = keyLock;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public OfferDto getOffer() {
		return offer;
	}

	public void setOffer(OfferDto offer) {
		this.offer = offer;
	}
	
	public ValidateDto(ValidateOffer entity) {
		this.idOffer = entity.getOffer().getId();
		this.keyLock = entity.getKeyLock();
		this.value = entity.getValue();
		this.offer = new OfferDto(entity.getOffer());
		this.id = entity.getId();
	}
	
	public ValidateDto() {
		
	}
}
