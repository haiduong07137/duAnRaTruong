package com.example.demo.service.impl;

import java.io.File;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.service.FileUploadService;
import com.example.demo.service.ProductService;

@Service
public class FileUploadServiceImpl implements  FileUploadService {

	@Value("${attachment.path}")
	private String attachmentPath;

	@Value("${localhost.path}")
	private String hostPath;

	@Value("${server.servlet.context-path}")
	private String contextPath;

	@Value("${attachment.context.path}")
	private String attachmentContextPath;

	@Autowired
	private ProductService productService;

	@Autowired
	private AgencyServiceImpl agencyServiceImpl;

	public AgencyDto avatarUpdate(MultipartFile avatar, Long userId) {
		String absolutePath = this.attachmentPath + "user/" + userId + "/";
		String fileName = avatar.getOriginalFilename().split("\\.(?=[^\\.]+$)")[0];
		String extension = avatar.getOriginalFilename().split("\\.(?=[^\\.]+$)")[1];

		try {
			if (!new File(absolutePath).exists()) {
				new File(absolutePath).mkdirs();
			} else {
            	File folder = new File(absolutePath);
            	// DUng tam thoi xoa all file, mai sau co nhieu anh cua san pham thi can sua lai ham nay
            	if (folder.listFiles() != null) {
            		for (File file : folder.listFiles()) {
            			file.delete();
            		}
            	}
            	new File(absolutePath).delete();
            	new File(absolutePath).mkdirs();
            }
			File fileToBeSaved = new File(absolutePath, fileName + "." + extension);
			avatar.transferTo(fileToBeSaved);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}

		String mainImageUrl = this.hostPath  + "resources/user/" + userId + "/"
				+ fileName + "." + extension; 
		AgencyDto agency = agencyServiceImpl.getCurrentUser();
		if (agency != null) {
			agency.setImagePath(mainImageUrl);
			agencyServiceImpl.saveOrUpdate(agency, agency.getId(), userId);
		}
		return agency;
	}

	@Override
	public ProductDto uploadProductImage(MultipartFile uploadFile, Long productID) {
		String absolutePath = this.attachmentPath + "/";
		String fileName = uploadFile.getOriginalFilename().split("\\.(?=[^\\.]+$)")[0];
		String extension = uploadFile.getOriginalFilename().split("\\.(?=[^\\.]+$)")[1];
		UUID fileNameImage = UUID.randomUUID();
		try { 
		File fileToBeSaved = new File(absolutePath, fileNameImage + "." + extension);
		uploadFile.transferTo(fileToBeSaved);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		
		String mainImageUrl = this.hostPath + "/api/upload/getImage/"+fileNameImage+"."+extension;
		ProductDto dto = productService.updateImage(mainImageUrl, productID);
		return dto;
	}

}
