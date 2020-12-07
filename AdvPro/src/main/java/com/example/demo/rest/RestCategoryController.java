package com.example.demo.rest;
 

import java.util.List;
import java.util.UUID;

import org.apache.catalina.authenticator.Constants;
import org.springframework.beans.factory.annotation.Autowired;
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

import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.seachdto.CategorySearchDto;
import com.example.demo.service.CategoryService;



@RestController 
@CrossOrigin(origins = {"http://localhost:3001","http://localhost:3000" })
@RequestMapping(path = "/api/category")
public class RestCategoryController {

    @Autowired
    CategoryService categoryService;

   
    @RequestMapping(value = "/searchByPage", method=RequestMethod.POST)
    public ResponseEntity<Page<CategoryDto>> searchByPage(@RequestBody CategorySearchDto searchDto) {
	Page<CategoryDto> page = categoryService.searchByPage(searchDto);

	return new ResponseEntity<>(page, HttpStatus.OK);
    }

    
    @RequestMapping(value = "/check/codeWasUsed", method = RequestMethod.POST)
    public Boolean codeWasUsed(@RequestBody CategoryDto dto) {
	boolean result = true;
	if (dto.getCode() != null && StringUtils.hasText(dto.getCode()) )
	    result = categoryService.checkCodeWasUsed(dto.getCode(), dto.getId());
	return result;
    }

    
    @RequestMapping(value = "/check/nameWasUsed", method = RequestMethod.POST)
    public Boolean nameWasUsed(@RequestBody CategoryDto dto) {
	boolean result = true;
	if (dto.getName() != null && StringUtils.hasText(dto.getName()) )
	    result = categoryService.checkNameWasUsed(dto.getName(), dto.getId());
	return result;
    }

   
    @RequestMapping(value = "/{id}", method=RequestMethod.GET)
    public ResponseEntity<CategoryDto> getOne(@PathVariable("id") Long id) {
	CategoryDto dto = categoryService.getOne(id);

	return new ResponseEntity<>(dto, HttpStatus.OK);
    }

    
    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<CategoryDto> saveOne(@RequestBody CategoryDto dto) {
    	
	CategoryDto result = categoryService.saveOne(dto, null);

	return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<CategoryDto> updateOne(@RequestBody CategoryDto dto, @PathVariable("id") Long id) {
	CategoryDto result = categoryService.saveOne(dto, id);

	return new ResponseEntity<>(result, result != null ? HttpStatus.OK : HttpStatus.BAD_REQUEST);
    }

    
    @RequestMapping(value = "/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Boolean> deleteById(@PathVariable("id") Long id) {
	categoryService.deleteById(id);

	return new ResponseEntity<>(true, HttpStatus.OK);
    }


   
//    @RequestMapping(value = "/deletecheckMultiple/{id}", method = RequestMethod.DELETE)
//    public ResponseEntity<Boolean> deleteCheckID(@PathVariable("id") Long id) {
//	boolean result = categoryService.deleteCheckById(id);
//	if (result) {
//	    categoryService.deleteById(id);
//	    return new ResponseEntity<>(result, HttpStatus.OK);
//	} else
//	    return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
//    }

	@RequestMapping(value = "/deleteMultiple", method = RequestMethod.DELETE)
	public ResponseEntity<Boolean> deleteMultiple(@RequestBody List<Long> idList) {
		categoryService.deleteMultiple(idList);
		return new ResponseEntity<Boolean>(HttpStatus.OK);
	}


}
