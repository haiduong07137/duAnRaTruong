package com.example.demo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.domain.Category;
import com.example.demo.domain.Product;
import com.example.demo.domain.ProductCategory;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.ProductCategoryDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.seachdto.ProductSearchDto;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping(path = "/api/product")
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000" })
public class RestProductController {

	@Autowired
	ProductService productService;

	@Value("${attachment.path}")
	private String attachmentPath; 
	
	
	@RequestMapping(value = "/searchByPage", method = RequestMethod.POST)
	public ResponseEntity<Page<ProductDto>> searchByPage(@RequestBody ProductSearchDto searchDto) {
		Page<ProductDto> page = productService.searchByPage(searchDto);


		return new ResponseEntity<Page<ProductDto>>(page, HttpStatus.OK);
	}
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public List<ProductDto> getAll() {
		return productService.getAllProduct();
	}
 
	@RequestMapping(value = "/check/codeWasUsed", method = RequestMethod.POST)
	public Boolean codeWasUsed(@RequestBody ProductDto dto) {
		boolean result = true;
		if (dto.getCode() != null && StringUtils.hasText(dto.getCode())) {
			result = productService.checkCodeWasUsed(dto.getCode(), dto.getId());
		}
		return result;
	}
 
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<ProductDto> getOne(@PathVariable("id") Long id) {
		ProductDto dto = productService.getOne(id);
		return new ResponseEntity<ProductDto>(dto, HttpStatus.OK);
	}
 
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ResponseEntity<ProductDto> saveOne(@RequestBody ProductDto dto) {
		ProductDto result = productService.saveOneOrUpdate(dto, null);
		return new ResponseEntity<ProductDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public ResponseEntity<ProductDto> updateOne(@RequestBody ProductDto dto, @PathVariable("id") Long id) {
		ProductDto result = productService.saveOneOrUpdate(dto, id);

		return new ResponseEntity<ProductDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteById(@PathVariable("id") Long id) {
		productService.deleteById(id);

		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/getPublicOffer/{id}", method = RequestMethod.GET)
	public ResponseEntity<OfferDto> getPublicOffer(@PathVariable("id") Long id) {
		OfferDto result = productService.getPublicOffer(id);
		return new ResponseEntity<OfferDto>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	}
 
	@RequestMapping(value = "/getPageProductAddAgency/{agencyId}", method = RequestMethod.POST)
	public ResponseEntity<Page<ProductDto>> getPageProductAgencyDontHave(@RequestBody ProductSearchDto searchDto,
			@PathVariable("agencyId") Long agencyId) {
		Page<ProductDto> page = productService.getPageProductAgencyDontHave(searchDto, agencyId);
		return new ResponseEntity<Page<ProductDto>>(page, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/changeIsShowOffer/{id}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> changeIsShowOffer(@PathVariable("id") Long id) {
		productService.changeIsShowOffer(id);
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
 
	@RequestMapping(value = "/getLocationList", method = RequestMethod.POST)
	public List<String> getLocationList() {
		return productService.getLocationList();
	} 
	@RequestMapping(value = "/getConversionType", method = RequestMethod.POST)
	public List<String> getConversionType() {
	return productService.getConversionTypeList();
}
 
	@RequestMapping(value = "/addMultipleOfferToAgency/{id}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addMultipleOfferToAgency(@RequestBody List<AgencyDto> idList,
			@PathVariable("id") Long productId) {
		productService.addMultipleOfferToAgency(idList, productId);
		return new ResponseEntity<Boolean>(HttpStatus.OK);
	}
 
	@RequestMapping(value = "/addOfferToAllAgency/{id}", method = RequestMethod.POST)
	public ResponseEntity<Boolean> addOfferToAllAgency(@PathVariable("id") Long productId) {
		productService.addOfferToAllAgency(productId);
		return new ResponseEntity<Boolean>(HttpStatus.OK);
	}
	
	
	@RequestMapping(value = "/getListcategoriesAuto", method = RequestMethod.GET)
	public ResponseEntity<List<CategoryDto>> getListcategoriesAuto() {
	 
		List<CategoryDto> result = productService.getListcategoriesAuto();
		System.out.println("xxxxxxxxxxxxxxxxxx"+result.size());
		return new ResponseEntity<List<CategoryDto>>(result, (result != null) ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
	
	}
	
	
}
