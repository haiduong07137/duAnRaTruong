package com.example.demo.dto;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import com.example.demo.domain.Lead;
import com.example.demo.domain.Offer;
import com.example.demo.domain.OfferPayout; 

public class OfferDto extends BaseObjectDto {
	private static final long serialVersionUID = 1L;

	private ProductDto product;
	private AgencyDto agency;
	private Double payoutValue;
	private Double publicPayoutValue;
	private Boolean isPublicPayout;
	private Set<OfferPayoutDto> offerPayouts;
	private String conversionType;
	private String currency;
	private String status;
	private Boolean isShow; 
	private Date applyDate;
	private Date endDate;
	private String pubName;
	private List<OfferDto> relatedOffer;
	private OfferDto mainOffer;
	private String note; 
   	private String websiteUrl; 
   	private String linkRedirect; 
   	private Long countClick;
	private Set<LeadDto> leadDto;

	
	//
	private Long countOfferPrivate;
	private Long countOfferPublic;
	
	
	
	
	public Long getCountOfferPrivate() {
		return countOfferPrivate;
	}

	public void setCountOfferPrivate(Long countOfferPrivate) {
		this.countOfferPrivate = countOfferPrivate;
	}

	public Long getCountOfferPublic() {
		return countOfferPublic;
	}

	public void setCountOfferPublic(Long countOfferPublic) {
		this.countOfferPublic = countOfferPublic;
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

	public OfferDto getMainOffer() {
		return mainOffer;
	}

	public void setMainOffer(OfferDto mainOffer) {
		this.mainOffer = mainOffer;
	}

	public String getPubName() {
		return pubName;
	}

	public void setPubName(String pubName) {
		this.pubName = pubName;
	}

	 

	public List<OfferDto> getRelatedOffer() {
		return relatedOffer;
	}

	public void setRelatedOffer(List<OfferDto> relatedOffer) {
		this.relatedOffer = relatedOffer;
	}

	 
 
	public Double getPublicPayoutValue() {
		return publicPayoutValue;
	}

	public void setPublicPayoutValue(Double publicPayoutValue) {
		this.publicPayoutValue = publicPayoutValue;
	}
 

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

	public Set<OfferPayoutDto> getOfferPayouts() {
		return offerPayouts;
	}

	public void setOfferPayouts(Set<OfferPayoutDto> offerPayouts) {
		this.offerPayouts = offerPayouts;
	}

	public String getConversionType() {
		return conversionType;
	}

	public void setConversionType(String conversionType) {
		this.conversionType = conversionType;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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

	public OfferDto() {

	}

	public OfferDto(Offer entity) {
		if (entity != null) {
			this.createDate=entity.getCreateDate();
			this.id = entity.getId(); 
			this.product = new ProductDto(entity.getProduct());
			this.agency = new AgencyDto(entity.getAgency());
			this.payoutValue = entity.getPayoutValue();
			this.isPublicPayout = entity.getIsPublicPayout();
			this.conversionType = entity.getConversionType();
			this.status = entity.getStatus();
			this.currency = entity.getCurrency();
			this.isShow = entity.getIsShow();
			this.applyDate = entity.getApplyDate();
			this.endDate = entity.getEndDate();
			this.pubName = entity.getPubName(); 
			this.note=entity.getNote();
			this.websiteUrl=entity.getWebsiteUrl();
			this.linkRedirect= entity.getLinkRedirect();
			this.countClick=entity.getCountClick();
			if (entity.getOfferPayout() != null && entity.getOfferPayout().size() > 0) {
				this.offerPayouts = new HashSet<OfferPayoutDto>();

				for (OfferPayout offerPayout : entity.getOfferPayout()) {
					OfferPayoutDto dto = new OfferPayoutDto(offerPayout);
					this.offerPayouts.add(dto);
				}
			}
			this.leadDto = new HashSet<LeadDto>();
			if (entity.getLead() != null && entity.getLead().size() > 0) { 
				for (Lead lead : entity.getLead()) {
					LeadDto dto = new LeadDto(lead,true);
					this.leadDto.add(dto);
				}
			}
			
			if (entity.getParent() != null) {
				this.mainOffer = new OfferDto(entity.getParent(),false,false);
			}
		}
	}

	public OfferDto(Offer entity, boolean relatedOffer,boolean mainOffer) {
		if (entity != null) {
			this.id = entity.getId(); 
			this.product = new ProductDto(entity.getProduct(),true);
			this.agency = new AgencyDto(entity.getAgency(),true);
			this.payoutValue = entity.getPayoutValue();
			this.isPublicPayout = entity.getIsPublicPayout();
			this.conversionType = entity.getConversionType();
			this.status = entity.getStatus();
			this.currency = entity.getCurrency();
			this.isShow = entity.getIsShow();
			this.applyDate = entity.getApplyDate();
			this.endDate = entity.getEndDate();
			this.note=entity.getNote();
		  	this.websiteUrl=entity.getWebsiteUrl();
			this.linkRedirect= entity.getLinkRedirect();
			this.countClick=entity.getCountClick();
		    
			if(relatedOffer) {
				if(entity.getRelatedOffer()!=null){
					List<OfferDto> relatedOffers = new ArrayList<OfferDto>();
					for(Offer cat:entity.getRelatedOffer()) {
						OfferDto catDto = new OfferDto(cat,true,false);
						relatedOffers.add(catDto);
					}
					this.setRelatedOffer(relatedOffers);
				}
			}
			if (mainOffer ) {
				this.mainOffer = new OfferDto(entity.getParent(),false,true);
			}
		}
		
	}
}
