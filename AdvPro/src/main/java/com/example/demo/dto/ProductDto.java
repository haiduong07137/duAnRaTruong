package com.example.demo.dto;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.domain.LandingPage;
import com.example.demo.domain.Product;
import com.example.demo.domain.ProductCategory;
import com.example.demo.domain.ProductPayout;
import com.example.demo.domain.User;

public class ProductDto extends BaseObjectDto {
	private Long userId;
	private String name;
	private String code;
	private String mainImageUrl;
	private String description;
	private Double price;
	private Double currentPayout;
	private String currency;
	private Date createDate;
	private Date modifyDate;
	private Boolean isShow;
	private Set<ProductPayoutDto> productPayouts;
	private Set<LandingPageDto> landingPages;
	private Set<CategoryDto> categories;
	private String currencyPayout; 
	private UserDto product_manager; 
	private String websiteUrl;// NEW, APPROVED

	
	
 	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public UserDto getProduct_manager() {
		return product_manager;
	}

	public void setProduct_manager(UserDto product_manager) {
		this.product_manager = product_manager;
	}

	private Boolean isCheck = false;

	public Boolean getIsCheck() {
		return isCheck;
	}

	public void setIsCheck(Boolean isCheck) {
		this.isCheck = isCheck;
	}

	public String getCurrencyPayout() {
		return currencyPayout;
	}

	public void setCurrencyPayout(String currencyPayout) {
		this.currencyPayout = currencyPayout;
	}

	/* Getters and Setters */
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

	public String getMainImageUrl() {
		return mainImageUrl;
	}

	public void setMainImageUrl(String mainImageUrl) {
		this.mainImageUrl = mainImageUrl;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Double getCurrentPayout() {
		return currentPayout;
	}

	public void setCurrentPayout(Double currentPayout) {
		this.currentPayout = currentPayout;
	}

	public Set<ProductPayoutDto> getProductPayouts() {
		return productPayouts;
	}

	public void setProductPayouts(Set<ProductPayoutDto> productPayout) {
		this.productPayouts = productPayout;
	}

	public Set<LandingPageDto> getLandingPages() {
		return landingPages;
	}

	public void setLandingPages(Set<LandingPageDto> landingPages) {
		this.landingPages = landingPages;
	}

	public Set<CategoryDto> getCategories() {
		return categories;
	}

	public void setCategories(Set<CategoryDto> categories) {
		this.categories = categories;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public Date getModifyDate() {
		return modifyDate;
	}

	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Boolean getIsShow() {
		return isShow;
	}

	public void setIsShow(Boolean isShow) {
		this.isShow = isShow;
	}
	

 

	

	public String getWebsiteUrl() {
		return websiteUrl;
	}

	public void setWebsiteUrl(String websiteUrl) {
		this.websiteUrl = websiteUrl;
	}

	public ProductDto() {
		super();
	}

	public ProductDto(Product entity) {
		super();
		if (entity != null) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.code = entity.getCode();
			this.mainImageUrl = entity.getMainImageUrl();
			this.description = entity.getDescription();
			this.price = entity.getPrice();
			this.currency = entity.getCurrency();
			this.currencyPayout = entity.getCurrencyPayout();
			this.createDate = entity.getCreateDate();
			this.websiteUrl = entity.getWebsiteUrl();
			if (entity.getProduct_manager() != null) {
				this.product_manager = new UserDto(entity.getProduct_manager());
			}
			if (entity.getIsShow() != null) {
				this.setIsShow(entity.getIsShow());
			} else {
				this.setIsShow(true);
			}

			if (entity.getProductPayout() != null && entity.getProductPayout().size() > 0) {
				this.productPayouts = new HashSet<ProductPayoutDto>();
				for (ProductPayout productPayout : entity.getProductPayout()) {

					ProductPayoutDto dto = new ProductPayoutDto(productPayout);
					this.productPayouts.add(dto);

					if (productPayout.getIsCurrent()) {
						this.currentPayout = productPayout.getPayoutValue();
					}
				}
			}

			if (entity.getLandingPage() != null && entity.getLandingPage().size() > 0) {
				this.landingPages = new HashSet<LandingPageDto>();
				for (LandingPage landingPage : entity.getLandingPage()) {

					LandingPageDto dto = new LandingPageDto(landingPage);
					this.landingPages.add(dto);
				}
			}

			if (entity.getProductCategory() != null && entity.getProductCategory().size() > 0) {
				this.categories = new HashSet<CategoryDto>();
				for (ProductCategory productCategory : entity.getProductCategory()) {
					CategoryDto dto = new CategoryDto(productCategory.getCategory());
					this.categories.add(dto);
				}
			}
		}
	}

	public ProductDto(Product entity, boolean simple) {
		super();
		if (entity != null) {
			this.id = entity.getId();
			this.name = entity.getName();
			this.code = entity.getCode();
			this.mainImageUrl = entity.getMainImageUrl();
			this.description = entity.getDescription();
			this.price = entity.getPrice();
			this.currency = entity.getCurrency();
			this.currencyPayout = entity.getCurrencyPayout();
			this.createDate = entity.getCreateDate();
			this.websiteUrl = entity.getWebsiteUrl();
			if (entity.getProductPayout() != null && entity.getProductPayout().size() > 0) {
				this.productPayouts = new HashSet<ProductPayoutDto>();
				for (ProductPayout productPayout : entity.getProductPayout()) {

					ProductPayoutDto dto = new ProductPayoutDto(productPayout, true);
					this.productPayouts.add(dto);

					if (productPayout.getIsCurrent()) {
						this.currentPayout = productPayout.getPayoutValue();
					}
				}
			}
			if (entity.getIsShow() != null) {
				this.setIsShow(entity.getIsShow());
			} else {
				this.setIsShow(true);
			}
		}
	}

	public ProductDto(UUID id, String mainImageUrl) {
		super();
		this.mainImageUrl = mainImageUrl;
	}
}
