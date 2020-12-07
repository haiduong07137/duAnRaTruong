package com.example.demo.dto;

import java.util.Set;

import javax.persistence.Column;

import com.example.demo.domain.AgencyUser;
import com.example.demo.domain.Role;
import com.example.demo.domain.User;

public class RoleDto extends BaseObjectDto {

	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public RoleDto() {
		// TODO Auto-generated constructor stub
	}

	public RoleDto(Role entity) {
		this.name = entity.getName();
	}

}
