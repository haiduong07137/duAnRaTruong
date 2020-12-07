package com.example.demo.dto;

import java.util.Date;

import javax.persistence.Column;

import com.example.demo.domain.OfferPayout;
 
public class OfferPayoutDto extends BaseObjectDto {
	private OfferDto offer; //Sản phẩm nào
	private Double payoutValue; //Giá trị tiền 
	private Boolean isCurrent; 
	private String modifiedBy;
	private Date applyDate;
	private Date endDate;
	private String currencyPayout;
	private String note;
	
	
		
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	 
	public OfferDto getOffer() {
		return offer;
	}
 
	public String getModifiedBy() {
		return modifiedBy;
	}
	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	public void setOffer(OfferDto offer) {
		this.offer = offer;
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
	public Date getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(Date applyDate) {
		this.applyDate = applyDate;
	}
	
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	public String getCurrencyPayout() {
		return currencyPayout;
	}
	public void setCurrencyPayout(String currencyPayout) {
		this.currencyPayout = currencyPayout;
	}
	public OfferPayoutDto() {
		super();
	}
	public OfferPayoutDto(OfferPayout entity) {
		super();
		if (entity != null) {
			this.createDate=entity.getCreateDate();
			this.id = entity.getId();  
			this.offer = new OfferDto(entity.getOffer(),false,false);
			this.payoutValue = entity.getPayoutValue();
			this.isCurrent = entity.getIsCurrent(); 
			this.applyDate=entity.getApplyDate();
			this.endDate=entity.getEndDate();
			this.currencyPayout=entity.getCurrencyPayout();
			this.note=entity.getNote();
		}
	}
	
}
