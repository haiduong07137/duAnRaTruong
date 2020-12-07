package com.example.demo.domain;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
 
@XmlRootElement
@Table(name = "tbl_product")
@Entity
public class Product extends BaseObject implements java.io.Serializable {
	@Column(name="name")
	private String name;
	
	@Column(name="code")
	private String code;
	
	@Column(name="main_image_url")
	private String mainImageUrl;
	
	@Column(name="description", columnDefinition="TEXT")
	private String description;
	
	@Column(name="price")
	private Double price;

	@OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	private Set<ProductCategory> productCategory;
	
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    private Set<ProductPayout> productPayout;
    
    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @NotFound(action = NotFoundAction.IGNORE)
    private Set<LandingPage> landingPage;
    
	@OneToOne
	@JoinColumn(name = "product_manager") 
	@NotFound(action = NotFoundAction.IGNORE)
	private User product_manager; //NEW, APPROVED
    
    @Column(name="currency")
    private String currency; // USD, VND, THB, IDR
    

	@Column(name="isshow")
	private Boolean isShow;
	
	@Column(name="currency_payout")// don vi tien te cua payout
	private String currencyPayout; // hoa hong
	
	@Column(name="website_url")// website link
	private String websiteUrl; // hoa hong
    
	public User getProduct_manager() {
		return product_manager;
	}
	public void setProduct_manager(User product_manager) {
		this.product_manager = product_manager;
	}
	public String getCurrencyPayout() {
		return currencyPayout;
	}
	public void setCurrencyPayout(String currencyPayout) {
		this.currencyPayout = currencyPayout;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getMainImageUrl() {
		return mainImageUrl;
	}
	public void setMainImageUrl(String mainImageUrl) {
		this.mainImageUrl = mainImageUrl;
	}
	public Double getPrice() {
		return price;
	}
	public void setPrice(Double price) {
		this.price = price;
	}
	public Set<ProductPayout> getProductPayout() {
		return productPayout;
	}
	public void setProductPayout(Set<ProductPayout> productPayout) {
		this.productPayout = productPayout;
	}
	public Set<ProductCategory> getProductCategory() {
		return productCategory;
	}
	public void setProductCategory(Set<ProductCategory> productCategory) {
		this.productCategory = productCategory;
	}
	public Set<LandingPage> getLandingPage() {
		return landingPage;
	}
	public void setLandingPage(Set<LandingPage> landingPage) {
		this.landingPage = landingPage;
	}
	public String getCurrency() {
		return currency;
	}
	public void setCurrency(String currency) {
		this.currency = currency;
	}
	
	
	public String getWebsiteUrl() {
		return websiteUrl;
	}
	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}
	public Boolean getIsShow() {
		return isShow;
	}
	public void setIsShow(Boolean isShow) {
		this.isShow = isShow;
	}
	
}
