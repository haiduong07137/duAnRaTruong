package com.example.demo.service.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.demo.domain.Agency;
import com.example.demo.domain.AgencyUser;
import com.example.demo.domain.User;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.seachdto.AgencySearchDto;
import com.example.demo.repository.AgencyRepository;
import com.example.demo.repository.AgencyUserRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.AgencyService;
import com.example.demo.utils.EmailConstants;

@Service
public class AgencyServiceImpl implements AgencyService {
	@Autowired
	private AgencyRepository agencyRepository;

	@Autowired
	private AgencyUserRepository agencyUserRepository;

	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	@Autowired
	JavaMailSender emailSender;

	@Value("${spring.mail.username}")
	// Replace with your email here:
	private String emailAddress;

	@Autowired
	UserRepository userRepository;
	 

	@Override
	public void deleteById(Long id) {
		agencyRepository.deleteById(id);
	}

	@Override
	public AgencyDto saveOrUpdate(AgencyDto dto, Long long1, Long UserId) {
		if (dto != null) {
			Agency entity = null;
			if (long1 != null) {
				if (dto.getId() != null && !dto.getId().equals(long1))
					return null;
				entity = agencyRepository.getOne(long1);
			}
			if (entity == null)
				entity = new Agency();
			entity.setCode(dto.getCode());
			entity.setName(dto.getName());
			entity.setCountry(dto.getCountry());
			entity.setEmail(dto.getEmail());
			entity.setPhone(dto.getPhone());
			entity.setCode(dto.getCode());
			entity.setImagePath(dto.getImagePath());
			entity.setDescription(dto.getDescription());
			entity.setWebsite(dto.getWebsite());
			entity.setIsNetwork(dto.getIsNetwork());
			entity.setSocialContact(dto.getSocialContact());
			entity.setTraffic_Source(dto.getTrafficSource());
			entity.setComPany(dto.getComPany());
			if (entity.getId() != null) {
				entity.setModifyDate(new Date());
			} else {
				entity.setModifyDate(new Date());
				entity.setCreateDate(new Date());
			}
			entity = agencyRepository.save(entity);
			
			if (UserId != null && long1 == null) {
				AgencyUser AgencyUser = new AgencyUser();
				User user = userRepository.getOne(UserId);
				AgencyUser.setAgency(entity);
				AgencyUser.setUser(user);
				agencyUserRepository.save(AgencyUser);
			}
			return new AgencyDto(entity);
		}
		return null;
	}

	@Override
	public Page<AgencyDto> searchByPage(AgencySearchDto dto) {
		if (dto == null)
			return null;

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;

		String whereClause = ""; 
		// order with distinct
		String sqlOrder = "SELECT new com.example.demo.dto.AgencyDto(entity) FROM Agency entity WHERE entity.id in ( ";
		
		String sqlCount = "select count( DISTINCT entity.id) from Agency as entity "
 
				+ "where (1=1) and entity.isNetwork = true ";
		
		String sql = "select DISTINCT entity.id from Agency as entity "
 
				+ "where (1=1) and entity.isNetwork = true ";
		
		String orderBy = " ORDER BY entity.createDate DESC ";
		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.email) LIKE UPPER(:text) OR UPPER(entity.phone) LIKE UPPER(:text) "
					+ " OR UPPER(entity.socialContact) LIKE UPPER(:text)     )"; 
		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlOrder + sql + " ) " + orderBy; 
		Query q = manager.createQuery(sql, AgencyDto.class); 
		Query qCount = manager.createQuery(sqlCount); 
		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		} 
		
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize); 
		List<AgencyDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult(); 
		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<AgencyDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public List<AgencyDto> findAll(AgencySearchDto dto) {

		/* Search All Agencys */
		if (dto == null)
			return null;

		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";

		String sql = "select new com.example.demo.dto.AgencyDto(entity) from Agency as entity where (1=1) ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( entity.name LIKE :text OR entity.code LIKE :text ) ";

		sql += whereClause + orderBy;

		Query q = manager.createQuery(sql, AgencyDto.class);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			q.setParameter("text", '%' + dto.getKeyword() + '%');

		List<AgencyDto> entities = q.getResultList();

		return entities;
		/* End Search */
	}

	@Override
	public Long getCurrentAgencyID(Long userID) {

		if (userID == null)
			return null;

		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";

		String sql = "select entity.agency.id from AgencyUser as entity where entity.user.id = :id ";

		sql += whereClause + orderBy;

		Query q = manager.createQuery(sql, Long.class);

		q.setParameter("id", userID);

		Long agencyID = null;

		try {
			agencyID = (Long) q.getSingleResult();
		} catch (Exception e) {

		}

		if (agencyID != null)
			return agencyID;

		return null;
	}

	@Override
	public AgencyDto setRoleBDStaffForAgency(Long agencyId, Long userId) {

		return null;
	}

	@Override
	public AgencyDto unSetRoleBDStaffForAgency(Long agencyId) {
		if (agencyId != null) {
			Agency agency = agencyRepository.findById(agencyId).get();
			return new AgencyDto(agency);
		}

		return null;
	}

	@Override
	public Page<AgencyDto> searchByPageListAgencyOfBDS(AgencySearchDto dto) {

		/* Search All Agencys */
		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;
		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";

		// order with distinct
		String sqlOrder = "SELECT new com.example.demo.dto.AgencyDto(entity) FROM Agency entity WHERE entity.id in ( ";
		String sqlCount = "select count(DISTINCT entity.id) from Agency as entity "
				+ "join AgencyUser au on entity.id=au.agency.id " + " join User as u on au.user.id=u.id "
				+ " join u.roles r"
				+ " where (1=1) and u.active=true and entity.userManage.id = :id and r.name in (:role)";
		String sql = "select DISTINCT entity.id from Agency as entity "
				+ " join AgencyUser au on entity.id=au.agency.id " + " join User as u on au.user.id=u.id "
				+ " join u.roles r "
				+ " where (1=1) and u.active=true and entity.userManage.id = :id and r.name in (:role)";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.email) LIKE UPPER(:text) OR UPPER(entity.phone) LIKE UPPER(:text) "
					+ " OR UPPER(entity.socialContact) LIKE UPPER(:text)     )";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlOrder + sql + " ) " + orderBy;

		Query q = manager.createQuery(sql, AgencyDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		long count = (long) qCount.getSingleResult();
		List<AgencyDto> entities = q.getResultList();
		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<AgencyDto> result = new PageImpl<>(entities, pageable, count);

		return result;
		/* End Search */

	}

	@Override
	public ByteArrayResource customersToExcel(List<AgencyDto> list) throws IOException {
		String[] COLUMNs = { "No. ", "Full Name", "Country", "Email", "Phone", "Contact", "Network", "Website",
				"Description" };
		try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream();) {
			CreationHelper createHelper = workbook.getCreationHelper();

			Sheet sheet = workbook.createSheet("Employees");

			Font headerFont = workbook.createFont();
			headerFont.setBold(true);
			headerFont.setColor(IndexedColors.BLUE.getIndex());

			CellStyle headerCellStyle = workbook.createCellStyle();
			headerCellStyle.setFont(headerFont);

			// Row for Header
			Row headerRow = sheet.createRow(0);

			// Header
			for (int col = 0; col < COLUMNs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(COLUMNs[col]);
				cell.setCellStyle(headerCellStyle);
			}

			// CellStyle for Age
			CellStyle ageCellStyle = workbook.createCellStyle();
			ageCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("#"));

			int rowIdx = 1;
			long stt = 0;
			for (AgencyDto emp : list) {
				Row row = sheet.createRow(rowIdx++);
				stt++;
				row.createCell(0).setCellValue(stt);
				row.createCell(1).setCellValue(emp.getName());
				row.createCell(2).setCellValue(emp.getCountry());
				row.createCell(3).setCellValue(emp.getEmail());
				row.createCell(4).setCellValue(emp.getPhone());
				row.createCell(5).setCellValue(emp.getSocialContact());
				if (emp.getIsNetwork() != null && emp.getIsNetwork())
					row.createCell(6).setCellValue("Yes");
				else
					row.createCell(6).setCellValue("No");
				row.createCell(7).setCellValue(emp.getWebsite());
				row.createCell(8).setCellValue(emp.getDescription());
			}

			ByteArrayOutputStream excelFile = new ByteArrayOutputStream();
			workbook.write(excelFile);
			workbook.close();
			return new ByteArrayResource(excelFile.toByteArray());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
 
	@Override
	public AgencyDto getOne(Long id) {
		Agency entity = agencyRepository.getOne(id);
		if (entity != null)
			return new AgencyDto(entity);
		return null;
	}

	 

 
	 

	@Override
	public Page<AgencyDto> getPageAgencyDontHaveProductThis(AgencySearchDto dto) {
		if (dto == null)
			return null;

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;

		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";
 
		String sqlCount = "select count(DISTINCT entity.id) from Agency as entity " 
				+ " where (1=1)   ";
		
		
		
		String sql = "select new com.example.demo.dto.AgencyDto(entity) from Agency as entity "  
				+ " where (1=1) ";
		
		
		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.email) LIKE UPPER(:text) OR UPPER(entity.phone) LIKE UPPER(:text) "
					+ " OR UPPER(entity.socialContact) LIKE UPPER(:text)     )";

		if (dto.getProductId() != null)
			whereClause += " AND  entity.id not in ( select O.agency.id from Offer as O join Agency as A on   A.id=O.agency.id  where O.product.id=:productId )	 ";
		
		
		sql += whereClause+ orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, AgencyDto.class);
		Query qCount = manager.createQuery(sqlCount);
		if (dto.getProductId() != null) { 
			q.setParameter("productId", dto.getProductId());
			qCount.setParameter("productId", dto.getProductId());
		}

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<AgencyDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<AgencyDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public List<AgencyDto> getListAgencyDontHaveManager() {

		String sql = "select new com.example.demo.dto.AgencyDto(entity) from Agency as entity "
				+ "JOIN AgencyUser AU ON entity.id = AU.agency.id " + "JOIN User U ON AU.user.id = U.id "
				+ "where (1=1) AND U.active = true AND entity.userManage.id IS NULL";
		String orderBy = " ORDER BY entity.createDate DESC ";
		sql += orderBy;
		Query q = manager.createQuery(sql, AgencyDto.class);

		List<AgencyDto> entities = q.getResultList();
		return entities;
	}

	@Override
	public void sendAssignMailTo(String emailTo, String management) {
		ExecutorService emailExecutor = Executors.newSingleThreadExecutor();
		emailExecutor.execute(() -> {
			String bodyEmail = EmailConstants.sendToAgency(management);
			try {
				// Tạo mail
				MimeMessage mail = emailSender.createMimeMessage();
				// Sử dụng lớp trợ giúp
				MimeMessageHelper helper = new MimeMessageHelper(mail);
				helper.setFrom(emailAddress);
				helper.setTo(emailTo);
				helper.setSubject("Offer Pro - Assign Notification");
				helper.setText(bodyEmail, true);
				// Gửi mail
				emailSender.send(mail);

			} catch (Exception e) {
				e.printStackTrace();
			}
		});

		emailExecutor.shutdown();
	}

	@Override
	public void sendBDSMailTo(String emailTo, String agency) {
		ExecutorService emailExecutor = Executors.newSingleThreadExecutor();
		emailExecutor.execute(() -> {
			String bodyEmail = EmailConstants.sendToBDS(agency);
			try {
				// Tạo mail
				MimeMessage mail = emailSender.createMimeMessage();
				// Sử dụng lớp trợ giúp
				MimeMessageHelper helper = new MimeMessageHelper(mail);
				helper.setFrom(emailAddress);
				helper.setTo(emailTo);
				helper.setSubject("Offer Pro - Assign Notification");
				helper.setText(bodyEmail, true);
				// Gửi mail
				emailSender.send(mail);

			} catch (Exception e) {
				e.printStackTrace();
			}
		});

		emailExecutor.shutdown();
	}

	 

	@Override
	public List<AgencyDto> getAgencyDontHaveOffer(Long userId) {
		String sql = "select new com.example.demo.dto.AgencyDto(entity) from Agency as entity "
				+ "JOIN AgencyUser AU ON entity.id = AU.agency.id "
				+ "where(1=1) AND entity.userManage.id= :userId AND entity.id NOT IN (select o.agency.id FROM Offer o JOIN Agency a ON o.agency.id=a.id)";
		String orderBy = " ORDER BY entity.createDate DESC ";
		sql += orderBy;
		Query q = manager.createQuery(sql, AgencyDto.class);
		q.setParameter("userId", userId);

		List<AgencyDto> entities = q.getResultList();
		return entities;
	}

	@Override
	public List<String> getRole() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AgencyDto getCurrentUser() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean checkPassword(String dto) throws UnsupportedEncodingException {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Page<AgencyDto> getByPage(int pageIndex, int pageSize) {
		
		return null;
	}
 
}
