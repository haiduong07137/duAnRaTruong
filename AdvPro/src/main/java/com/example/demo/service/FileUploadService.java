package com.example.demo.service;

import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.ProductDto;

public interface FileUploadService {
	public AgencyDto avatarUpdate(MultipartFile avatar,Long userId);

	public ProductDto uploadProductImage(MultipartFile uploadFile, Long productID);
}
