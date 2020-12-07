package com.example.demo.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
 

@XmlRootElement
@Table(name = "tbl_offer_payout")
@Entity
public class OfferPayout extends BaseObject{

	private static final long serialVersionUID = 1L;
	@ManyToOne
	@JoinColumn(name="offer_id")
	@NotFound(action = NotFoundAction.IGNORE)
	private Offer offer;
	@Column(name="payout_value")
	private Double payoutValue; //Giá trị tiền
	@Column(name="is_current")
	private Boolean isCurrent;
	@Column(name ="apply_date")
	private Date applyDate;
	@Column(name ="end_date")
	private Date endDate;
	@Column(name="currency_payout")
	private String currencyPayout;
    @Column(name ="note")
   	private String note;
    @Column(name ="website_url")
   	private String websiteUrl; 
    @Column(name ="link_redirect")
   	private String linkRedirect; 
    @Column(name ="count_click")
   	private Long countClick;
    
    
    
	
	public String getWebsiteUrl() {
		return websiteUrl;
	}
	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}
	public String getLinkRedirect() {
		return linkRedirect;
	}
	public void setLinkRedirect(String linkRedirect) {
		this.linkRedirect = linkRedirect;
	}
	public Long getCountClick() {
		return countClick;
	}
	public void setCountClick(Long countClick) {
		this.countClick = countClick;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public String getCurrencyPayout() {
		return currencyPayout;
	}
	public void setCurrencyPayout(String currencyPayout) {
		this.currencyPayout = currencyPayout;
	}
	public Offer getOffer() {
		return offer;
	}
	public void setOffer(Offer offer) {
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
	public void setIsCurrent(Boolean isCurrent) {
		this.isCurrent = isCurrent;
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
	
	
	

}
