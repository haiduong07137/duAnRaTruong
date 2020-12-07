package com.example.demo.domain;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
  
@XmlRootElement
@Table(name = "tbl_offer")
@Entity
public class Offer extends BaseObject{
	private static final long serialVersionUID = 1L;
	@ManyToOne()
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name="product_id" )
	private Product product;
	
	@ManyToOne
	@NotFound(action = NotFoundAction.IGNORE)
	@JoinColumn(name="agency_id")
	private Agency agency;
	
	@Column(name="payout_value")
	private Double payoutValue;
	
	@Column(name="is_public_payout")
	private Boolean isPublicPayout;
	
	@Column(name="currency")
	private String currency; // USD, VND, THB, IDR
	
    @OneToMany(mappedBy = "offer", fetch = FetchType.LAZY)
    @NotFound(action = NotFoundAction.IGNORE)
    private Set<OfferPayout> offerPayout;
    
    @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL, orphanRemoval = true)
	@NotFound(action = NotFoundAction.IGNORE)
	private Set<Lead> lead;
    
    @OneToMany(mappedBy = "offer", cascade = CascadeType.ALL, orphanRemoval = true)
   	@NotFound(action = NotFoundAction.IGNORE)
   	private Set<ValidateOffer> validateOffer;

   
	@Column(name="conversion_type")
    private String conversionType; // CPO, CPA
    
    @Column(name="status")
    private String status; // NEW, APPROVED
    
    @Column(name="isshow")
    private Boolean isShow;
    
    @Column(name ="apply_date")
	private Date applyDate;
    
    @Column(name ="end_date")
	private Date endDate;
    
    @Column(name ="pub_name")
	private String pubName;
    
    @OneToMany(mappedBy = "parent", fetch = FetchType.LAZY)  
    private Set<Offer> relatedOffer;
     
    @ManyToOne
    @JoinColumn(name="parent_id")
	@NotFound(action=NotFoundAction.IGNORE)
    private Offer parent;
    
    @Column(name ="note")
   	private String note;
    
    @Column(name ="website_url",columnDefinition = "TEXT") 
   	private String websiteUrl;
    
    @Column(name ="link_redirect")
   	private String linkRedirect;
    
    @Column(name ="count_click")
   	private Long countClick;
    
 
    
    public Set<ValidateOffer> getValidateOffer() {
		return validateOffer;
	}
	public void setValidateOffer(Set<ValidateOffer> validateOffer) {
		this.validateOffer = validateOffer;
	}
	public Set<Lead> getLead() {
		return lead;
	}
	public void setLead(Set<Lead> lead) {
		this.lead = lead;
	}
    
    
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
	public Offer getParent() {
		return parent;
	}
	public void setParent(Offer parent) {
		this.parent = parent;
	}
	public String getPubName() {
		return pubName;
	}
	public void setPubName(String pubName) {
		this.pubName = pubName;
	}
	public Set<Offer> getRelatedOffer() {
		return relatedOffer;
	}
	public void setRelatedOffer(Set<Offer> relatedOffer) {
		this.relatedOffer = relatedOffer;
	}
	public Product getProduct() {
		return product;
	}
	public void setProduct(Product product) {
		this.product = product;
	}
	public Agency getAgency() {
		return agency;
	}
	public void setAgency(Agency agency) {
		this.agency = agency;
	}
	public Double getPayoutValue() {
		return payoutValue;
	}
	public void setPayoutValue(Double payoutValue) {
		this.payoutValue = payoutValue;
	}
	public Boolean getIsPublicPayout() {
		return isPublicPayout;
	}
	public void setIsPublicPayout(Boolean isPublicPayout) {
		this.isPublicPayout = isPublicPayout;
	}
	public Set<OfferPayout> getOfferPayout() {
		return offerPayout;
	}
	public void setOfferPayout(Set<OfferPayout> offerPayout) {
		this.offerPayout = offerPayout;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getConversionType() {
		return conversionType;
	}
	public void setConversionType(String conversionType) {
		this.conversionType = conversionType;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	public Boolean getIsShow() {
		return isShow;
	}
	public void setIsShow(Boolean isShow) {
		this.isShow = isShow;
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
