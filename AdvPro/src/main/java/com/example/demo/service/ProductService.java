package com.example.demo.service;

import java.util.List; 
import org.springframework.data.domain.Page;

import com.example.demo.domain.Category;
import com.example.demo.domain.Product;
import com.example.demo.domain.ProductCategory;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.ProductCategoryDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.seachdto.ProductSearchDto;

public interface ProductService {
	
	Page<ProductDto> searchByPage(ProductSearchDto dto);
	
	ProductDto getOne(Long id);
	
	ProductDto saveOneOrUpdate(ProductDto dto, Long id);
	
	public void deleteById(Long id);
	
	OfferDto getPublicOffer(Long id);

	boolean checkCodeWasUsed(String code, Long id);

	Page<ProductDto> getPageProductAgencyDontHave(ProductSearchDto dto,Long agencyID);
	
	ProductDto updateImage(String mainImageUrl, Long id);
	
	void changeIsShowOffer(Long id);

	List<String> getLocationList();
	
	void addMultipleOfferToAgency(List<AgencyDto> listId,Long productId);
	
	void addOfferToAllAgency(Long productId);
	
	List<String> getConversionTypeList();

	List<CategoryDto> getListcategoriesAuto();
	List<ProductDto> getAllProduct();
}
