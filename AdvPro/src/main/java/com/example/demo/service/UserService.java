package com.example.demo.service;

import org.springframework.data.domain.Page;

import com.example.demo.domain.User;
import com.example.demo.dto.UserDto;
import com.example.demo.dto.seachdto.SearchDto;

public interface UserService { 

	void deleteById(Long id);

	UserDto saveOrUpdate(UserDto dto, Long id );

	Page<UserDto> searchByPage(SearchDto searchDto);
 

	UserDto getOne(Long id);

	UserDto checkLogin(UserDto dto);

}
