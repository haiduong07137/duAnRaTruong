package com.example.demo.service;
 

import java.util.List;

import org.springframework.data.domain.Page;

import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.seachdto.CategorySearchDto;

public interface CategoryService   {
	
	public void deleteById(Long id);
	
	Page<CategoryDto> searchByPage(CategorySearchDto dto);
	
	CategoryDto getOne(Long id);
	
	CategoryDto saveOne(CategoryDto dto, Long id);

    boolean checkCodeWasUsed(String code, Long id);

	boolean checkNameWasUsed(String name, Long id);

	public boolean deleteCheckById(Long id);

	void deleteMultiple(List<Long> idList);


}
