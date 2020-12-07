package com.example.demo.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.Transaction;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.demo.domain.Agency;
import com.example.demo.domain.Offer;
import com.example.demo.domain.OfferPayout;
import com.example.demo.domain.Product;
import com.example.demo.domain.ProductPayout;
import com.example.demo.domain.ValidateOffer;
import com.example.demo.dto.AnalticDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.OfferPayoutDto;
import com.example.demo.dto.seachdto.OfferSearchDto;
import com.example.demo.repository.AgencyRepository;
import com.example.demo.repository.OfferPayoutRepository;
import com.example.demo.repository.OfferRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ValidateOfferRepository;
import com.example.demo.service.OfferService;

@Service
public class OfferServiceImpl implements OfferService {

	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	@Autowired
	ValidateOfferRepository validateOfferRepository;

	@Autowired
	OfferRepository offerRepository;

	@Autowired
	OfferPayoutRepository offerPayoutRepository;

	@Autowired
	ProductRepository productRepository;

	@Autowired
	AgencyRepository agencyRepository;

	@Value("${server.servlet.context-path}")
	// Replace with your email here:
	private String contextPath;

	@Value("${localhost.path.client.user}")
	// Replace with your email here:
	private String localhost;

	@Value("${server.port}")
	// Replace with your email here:
	private String serverPort;

	@Override
	public Page<OfferDto> searchByPage(OfferSearchDto dto) {
		if (dto == null)
			return null;

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;

		String whereClause = "";

		String orderBy = " ORDER BY entity.createDate DESC";
		if (dto.getOrderBy() != null && StringUtils.hasLength(dto.getOrderBy().toString()))
			orderBy = " ORDER BY entity." + dto.getOrderBy() + " ASC";

		String sqlCount = "select count(entity.id) from Offer as entity where (1=1)";
		String sql = "select new com.example.demo.dto.OfferDto(entity) from Offer as entity where (1=1) AND entity.parent IS NULL";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.product.name) LIKE UPPER(:text) )";

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, OfferDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public OfferDto getOne(Long id) {
		Offer entity = offerRepository.getOne(id);

		if (entity != null)
			return new OfferDto(entity);

		return null;
	}

	@Override
	public OfferDto saveOrUpdate(OfferDto dto, Long id) {
		if (dto != null) {
			Offer entity = null;
			if (id != null) {
				if (dto.getId() != null && !dto.getId().equals(id))
					return null;
				entity = offerRepository.getOne(id);
			}
			if (entity == null)
				entity = new Offer();

			/* Set all the values */
			entity.setIsPublicPayout(dto.getIsPublicPayout());
			entity.setIsShow(dto.getIsShow());
			entity.setNote(dto.getNote());
			if (dto.getConversionType() != null)
				entity.setConversionType(dto.getConversionType());

			if (dto.getPubName() != null && dto.getPubName().length() > 0)
				entity.setPubName(dto.getPubName());
			entity.setIsPublicPayout(true);
			Offer mainOffer = null;
			if (dto.getMainOffer() != null && dto.getMainOffer().getId() != null) {
				mainOffer = offerRepository.getOne(dto.getMainOffer().getId());
				entity.setCurrency(mainOffer.getCurrency());
				entity.setConversionType(mainOffer.getConversionType());
				entity.setIsPublicPayout(false);
			}

			if (entity.getId() != null) {
				entity.setModifyDate(new Date());
			} else {
				entity.setCreateDate(new Date());

			}

			entity.setParent(mainOffer);

			if (dto.getStatus() != null)
				entity.setStatus(dto.getStatus());
			else
				entity.setStatus("NEW");
			Product product = null; // Sản phẩm (bắt buộc)
			Agency agency = null; // Bắt buộc
			Set<OfferPayout> offerPayouts = new HashSet<>();
			product = productRepository.getOne(dto.getProduct().getId());
			if (dto.getPayoutValue() == null) {
				for (ProductPayout productPayout : product.getProductPayout())
					if (productPayout.getIsCurrent() == true)
						entity.setPayoutValue(productPayout.getPayoutValue());
			} else
				entity.setPayoutValue(dto.getPayoutValue());

			if (dto.getProduct() != null && dto.getProduct().getId() != null && dto.getMainOffer() == null) {
				entity.setPayoutValue(product.getPrice());
				entity.setCurrency(product.getCurrencyPayout());
			}

			if (product == null)
				return null;

			if (dto.getAgency() != null && dto.getAgency().getId() != null)
				agency = agencyRepository.getOne(dto.getAgency().getId());

			if (agency == null)
				return null;

			if (dto.getOfferPayouts() != null && !dto.getOfferPayouts().isEmpty())
				for (OfferPayoutDto offerPayoutDto : dto.getOfferPayouts()) {
					OfferPayout offerPayout = offerPayoutRepository.getOne(offerPayoutDto.getId());
					if (offerPayout.getIsCurrent())
						offerPayout.setIsCurrent(false);
					offerPayouts.add(offerPayout);
				}
			entity.setAgency(agency);
			entity.setProduct(product);
			entity.setOfferPayout(offerPayouts);
			if (dto.getApplyDate() != null || dto.getEndDate() != null) {
				entity.setApplyDate(dto.getApplyDate());
				entity.setEndDate(dto.getEndDate());
			}
			if (dto.getPayoutValue() != null)
				entity.setPayoutValue(dto.getPayoutValue());
			entity = offerRepository.save(entity);
			if (entity != null) {
				OfferPayout offerPayout = new OfferPayout();
				Double payoutValue = product.getProductPayout().stream()
						.filter(productPayout -> productPayout.getIsCurrent()).map(ProductPayout::getPayoutValue)
						.reduce(0.0, (a, b) -> a + b);

				if (id != null)
					offerPayout.setPayoutValue(dto.getPayoutValue());
				else if (dto.getPayoutValue() != null)
					offerPayout.setPayoutValue(dto.getPayoutValue());
				else
					offerPayout.setPayoutValue(payoutValue);
				if (dto.getApplyDate() != null || dto.getEndDate() != null) {
					offerPayout.setApplyDate(dto.getApplyDate());
					offerPayout.setEndDate(dto.getEndDate());
				}
				offerPayout.setIsCurrent(true);
				offerPayout.setOffer(entity);
				offerPayout.setNote(entity.getNote());
				offerPayout = offerPayoutRepository.save(offerPayout);
				return new OfferDto(entity);
			}
		}
		return null;
	}

	@Override
	public void deleteById(Long id) {
		offerRepository.deleteById(id);
	}

	@Override
	public OfferDto saveOfferPrivate(OfferDto dto, Long id) {
		String linkRedirect = "";
		if (dto != null) {
			Offer entity = null;
			if (id != null) {
				if (dto.getId() != null && !dto.getId().equals(id))
					return null;
				entity = offerRepository.getOne(id);
				linkRedirect = localhost + contextPath + "/redirectToWebsite/" + entity.getId();
			}
			if (entity == null) {
				entity = new Offer();
				Long count = (long) 0;
				entity.setCountClick(count);
			}

			if (entity.getId() != null) {
				entity.setModifyDate(new Date());
			} else {
				entity.setCreateDate(new Date());

			}

			/* Set all the values */
			entity.setCurrency(dto.getCurrency());
			entity.setIsPublicPayout(dto.getIsPublicPayout());
			entity.setIsShow(dto.getIsShow());
			entity.setConversionType(dto.getConversionType());
			entity.setStatus(dto.getStatus());
			entity.setNote(dto.getNote());
			entity.setWebsiteUrl(dto.getWebsiteUrl());
			entity.setLinkRedirect(linkRedirect);
			Product product = null; // Sản phẩm (bắt buộc)
			Agency agency = null; // Bắt buộc
			Set<OfferPayout> offerPayouts = new HashSet<>();
			product = productRepository.getOne(dto.getProduct().getId());

			if (dto.getPayoutValue() == null) {
				for (ProductPayout productPayout : product.getProductPayout())
					if (productPayout.getIsCurrent() == true)
						entity.setPayoutValue(productPayout.getPayoutValue());
			} else
				entity.setPayoutValue(dto.getPayoutValue());

			if (dto.getProduct() != null && dto.getProduct().getId() != null)
				entity.setPayoutValue(product.getPrice());

			if (product == null)
				return null;

			if (dto.getAgency() != null && dto.getAgency().getId() != null)
				agency = agencyRepository.getOne(dto.getAgency().getId());

			if (agency == null)
				return null;

			if (dto.getOfferPayouts() != null && !dto.getOfferPayouts().isEmpty())
				for (OfferPayoutDto offerPayoutDto : dto.getOfferPayouts()) {
					OfferPayout offerPayout = offerPayoutRepository.getOne(offerPayoutDto.getId());
					if (offerPayout.getIsCurrent())
						offerPayout.setIsCurrent(false);

					offerPayouts.add(offerPayout);
				}

			entity.setAgency(agency);
			entity.setProduct(product);
			entity.setOfferPayout(offerPayouts);
			entity.setIsPublicPayout(false);
			entity.setPayoutValue(dto.getPayoutValue());
			entity.setApplyDate(dto.getApplyDate());
			entity.setEndDate(dto.getEndDate());
			entity = offerRepository.save(entity);
			if (entity != null) {
				OfferPayout offerPayout = new OfferPayout();
				offerPayout.setApplyDate(dto.getApplyDate());
				offerPayout.setEndDate(dto.getEndDate());
				offerPayout.setPayoutValue(dto.getPayoutValue());
				offerPayout.setCurrencyPayout(dto.getCurrency());
				offerPayout.setIsCurrent(true);
				offerPayout.setOffer(entity);
				offerPayout.setNote(entity.getNote());
				offerPayout.setCurrencyPayout(dto.getCurrency());
				offerPayout.setCountClick(entity.getCountClick());
				offerPayout.setWebsiteUrl(dto.getWebsiteUrl());
				offerPayout.setLinkRedirect(dto.getLinkRedirect());
//				offerPayout.setCreateDate(new Date());
				if (entity.getId() != null) {
					offerPayout.setModifyDate(new Date());
				} else {
					offerPayout.setModifyDate(new Date());
					offerPayout.setCreateDate(new Date());
				}
				offerPayout = offerPayoutRepository.save(offerPayout);
				return new OfferDto(entity);
			}
		}
		return null;
	}

	@Override
	public Page<OfferDto> getPrivateOfferList(OfferSearchDto dto, Long agencyID) {
		if (dto == null)
			return null;

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;

		String whereClause = "";
		String orderBy = " ORDER BY entity.product.createDate DESC ";
		String sqlCount = "SELECT count(DISTINCT entity.id) FROM Offer as entity "
				+ "JOIN Product P ON entity.product.id = P.id " + "JOIN ProductCategory PC ON P.id = PC.product.id "
				+ "JOIN Category C ON PC.category.id = C.id " + "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = false AND entity.agency.id = :agencyID AND PP.isCurrent = true AND entity.parent IS NULL";
		String sqlDistinct = "SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity   WHERE entity.id in ( ";
		String sql = "SELECT DISTINCT  entity.id FROM Offer as entity " + "JOIN Product P ON entity.product.id = P.id "
				+ "JOIN ProductCategory PC ON P.id = PC.product.id " + "JOIN Category C ON PC.category.id = C.id "
				+ "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = false AND entity.agency.id = :agencyID AND PP.isCurrent = true AND entity.parent IS NULL ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.product.name) LIKE UPPER(:text) OR UPPER(entity.product.code) like UPPER(:text) )";

		if (dto.getLocations() != null) {
			int locationIndex = 0;
			int numberOfLocations = dto.getLocations().size();
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					locationIndex += 1;
					if (locationIndex == 1) {
						if (numberOfLocations == 1)
							whereClause += " AND ( P.location = :location" + locationIndex + " )";
						else
							whereClause += " AND ( P.location = :location" + locationIndex;
					} else if (locationIndex != numberOfLocations)
						whereClause += " OR P.location = :location" + locationIndex;
					else
						whereClause += " OR P.location = :location" + locationIndex + " )";
				}
		}

		if (dto.getCategories() != null) {
			int categoryIndex = 0;
			int numberOfCategories = dto.getCategories().size();
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					categoryIndex += 1;
					if (categoryIndex == 1) {
						if (numberOfCategories == 1)
							whereClause += " AND ( C.name = :category" + categoryIndex + " )";
						else
							whereClause += " AND ( C.name = :category" + categoryIndex;
					} else if (categoryIndex != numberOfCategories)
						whereClause += " OR C.name = :category" + categoryIndex;
					else
						whereClause += " OR C.name = :category" + categoryIndex + " )";
				}
		}

		if (dto.getConversionTypes() != null) {
			int conversionTypeIndex = 0;
			int numberOfConversionTypes = dto.getConversionTypes().size();
			for (String conversionType : dto.getConversionTypes())
				if (StringUtils.hasText(conversionType)) {
					conversionTypeIndex += 1;
					if (conversionTypeIndex == 1) {
						if (numberOfConversionTypes == 1)
							whereClause += " AND ( P.conversionType = :conversionType" + conversionTypeIndex + " )";
						else
							whereClause += " AND ( P.conversionType = :conversionType" + conversionTypeIndex;
					} else if (conversionTypeIndex != numberOfConversionTypes)
						whereClause += " OR P.conversionType = :conversionType" + conversionTypeIndex;
					else
						whereClause += " OR P.conversionType = :conversionType" + conversionTypeIndex + " )";
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty())
			whereClause += " AND ( PP.payoutValue > :payoutRangeStart AND PP.payoutValue < :payoutRangeEnd )";

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency()))
			whereClause += " AND ( P.currency = :currency )";
		if (dto.isTimes())
			orderBy = " ORDER BY entity.product.createDate ASC ";
		else if (!dto.isTimes())
			orderBy = " ORDER BY entity.product.createDate DESC ";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlDistinct + sql + " ) " + orderBy;

		Query q = manager.createQuery(sql, OfferDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getLocations() != null) {
			int lIndex = 0;
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					lIndex += 1;
					q.setParameter("location" + lIndex, location);
					qCount.setParameter("location" + lIndex, location);
				}
		}

		if (dto.getCategories() != null) {
			int index = 0;
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					index += 1;
					q.setParameter("category" + index, category);
					qCount.setParameter("category" + index, category);
				}
		}

		if (dto.getConversionTypes() != null) {
			int index = 0;
			for (String conversionType : dto.getConversionTypes())
				if (StringUtils.hasText(conversionType)) {
					index += 1;
					q.setParameter("conversionType" + index, conversionType);
					qCount.setParameter("conversionType" + index, conversionType);
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty()) {
			q.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			q.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
			qCount.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			qCount.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
		}

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency())) {
			q.setParameter("currency", dto.getCurrency());
			qCount.setParameter("currency", dto.getCurrency());
		}

		q.setParameter("agencyID", agencyID);
		qCount.setParameter("agencyID", agencyID);

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public Page<OfferDto> getOfferList(OfferSearchDto dto, Long agencyID, String type) {
		if (dto == null)
			return null;

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;

		String whereClause = "";
		String orderBy = " ORDER BY entity.product.createDate DESC ";
		String sqlCount = "SELECT count(DISTINCT entity.id) FROM Offer as entity "
				+ "JOIN Product P ON entity.product.id = P.id " + "JOIN ProductCategory PC ON P.id = PC.product.id "
				+ "JOIN Category C ON PC.category.id = C.id " + "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = :isPublic AND entity.agency.id = :agencyID AND PP.isCurrent = true "
				+ "  AND entity.isShow = true AND entity.parent IS NULL";
		String sqlDistinct = "SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity   WHERE entity.id in ( ";

		String sql = "SELECT entity.id FROM Offer as entity " + "JOIN Product P ON entity.product.id = P.id "
				+ "JOIN ProductCategory PC ON P.id = PC.product.id " + "JOIN Category C ON PC.category.id = C.id "
				+ "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = :isPublic AND entity.agency.id = :agencyID AND PP.isCurrent = true "
				+ "   AND entity.isShow = true AND entity.parent IS NULL ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.product.name) LIKE UPPER(:text) )";

		if (dto.getLocations() != null) {
			int locationIndex = 0;
			int numberOfLocations = dto.getLocations().size();
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					locationIndex += 1;
					if (locationIndex == 1) {
						if (numberOfLocations == 1)
							whereClause += " AND ( P.location = :location" + locationIndex + " )";
						else
							whereClause += " AND ( P.location = :location" + locationIndex;
					} else if (locationIndex != numberOfLocations)
						whereClause += " OR P.location = :location" + locationIndex;
					else
						whereClause += " OR P.location = :location" + locationIndex + " )";
				}
		}

		if (dto.getCategories() != null) {
			int categoryIndex = 0;
			int numberOfCategories = dto.getCategories().size();
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					categoryIndex += 1;
					if (categoryIndex == 1) {
						if (numberOfCategories == 1)
							whereClause += " AND ( C.name = :category" + categoryIndex + " )";
						else
							whereClause += " AND ( C.name = :category" + categoryIndex;
					} else if (categoryIndex != numberOfCategories)
						whereClause += " OR C.name = :category" + categoryIndex;
					else
						whereClause += " OR C.name = :category" + categoryIndex + " )";
				}
		}

		if (dto.getConversionTypes() != null) {
			int conversionTypeIndex = 0;
			int numberOfConversionTypes = dto.getConversionTypes().size();
			for (String conversionType : dto.getConversionTypes())
				if (StringUtils.hasText(conversionType)) {
					conversionTypeIndex += 1;
					if (conversionTypeIndex == 1) {
						if (numberOfConversionTypes == 1)
							whereClause += " AND ( P.conversionType = :conversionType" + conversionTypeIndex + " )";
						else
							whereClause += " AND ( P.conversionType = :conversionType" + conversionTypeIndex;
					} else if (conversionTypeIndex != numberOfConversionTypes)
						whereClause += " OR P.conversionType = :conversionType" + conversionTypeIndex;
					else
						whereClause += " OR P.conversionType = :conversionType" + conversionTypeIndex + " )";
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty())
			whereClause += " AND ( PP.payoutValue > :payoutRangeStart AND PP.payoutValue < :payoutRangeEnd )";

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency()))
			whereClause += " AND ( P.currency = :currency )";

		if (dto.isTimes())
			orderBy = " ORDER BY entity.product.createDate ASC ";
		else
			orderBy = " ORDER BY entity.product.createDate DESC ";

		sql += whereClause;
		sql = sqlDistinct + sql + " ) " + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, OfferDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getLocations() != null) {
			int lIndex = 0;
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					lIndex += 1;
					q.setParameter("location" + lIndex, location);
					qCount.setParameter("location" + lIndex, location);
				}
		}

		if (dto.getCategories() != null) {
			int index = 0;
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					index += 1;
					q.setParameter("category" + index, category);
					qCount.setParameter("category" + index, category);
				}
		}

		if (dto.getConversionTypes() != null) {
			int index = 0;
			for (String conversionType : dto.getConversionTypes())
				if (StringUtils.hasText(conversionType)) {
					index += 1;
					q.setParameter("conversionType" + index, conversionType);
					qCount.setParameter("conversionType" + index, conversionType);
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty()) {
			q.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			q.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
			qCount.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			qCount.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
		}

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency())) {
			q.setParameter("currency", dto.getCurrency());
			qCount.setParameter("currency", dto.getCurrency());
		}

		q.setParameter("agencyID", agencyID);
		qCount.setParameter("agencyID", agencyID);

		if (type.equals("public")) {
			q.setParameter("isPublic", true);
			qCount.setParameter("isPublic", true);
		} else {
			q.setParameter("isPublic", false);
			qCount.setParameter("isPublic", false);
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public Page<OfferDto> getRequestOfferList(OfferSearchDto dto, Long userID, String type) {
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
		String sqlCount = "SELECT count(DISTINCT entity.id) FROM Offer as entity "
				+ "JOIN Product P ON entity.product.id = P.id " + "JOIN ProductCategory PC ON P.id = PC.product.id "
				+ "JOIN Category C ON PC.category.id = C.id " + "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = :isPublic   AND PP.isCurrent = true AND entity.isShow=true "
				+ "   AND entity.status = 'USER_REQUESTED' AND entity.parent IS NULL  ";
		String sqlDistinct = "SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer AS entity JOIN Product P ON entity.product.id = P.id  WHERE entity.id in ( ";
		String sql = "SELECT entity.id FROM Offer as entity " + "JOIN Product P ON entity.product.id = P.id "
				+ "JOIN ProductCategory PC ON P.id = PC.product.id " + "JOIN Category C ON PC.category.id = C.id "
				+ "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = :isPublic   AND PP.isCurrent = true AND entity.isShow=true "
				+ "   AND entity.status = 'USER_REQUESTED' AND entity.parent IS NULL ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.product.name) LIKE UPPER(:text) )";

		if (dto.getLocations() != null) {
			int locationIndex = 0;
			int numberOfLocations = dto.getLocations().size();
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					locationIndex += 1;
					if (locationIndex == 1) {
						if (numberOfLocations == 1)
							whereClause += " AND ( P.location = :location" + locationIndex + " )";
						else
							whereClause += " AND ( P.location = :location" + locationIndex;
					} else if (locationIndex != numberOfLocations)
						whereClause += " OR P.location = :location" + locationIndex;
					else
						whereClause += " OR P.location = :location" + locationIndex + " )";
				}
		}

		if (dto.getCategories() != null) {
			int categoryIndex = 0;
			int numberOfCategories = dto.getCategories().size();
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					categoryIndex += 1;
					if (categoryIndex == 1) {
						if (numberOfCategories == 1)
							whereClause += " AND ( C.name = :category" + categoryIndex + " )";
						else
							whereClause += " AND ( C.name = :category" + categoryIndex;
					} else if (categoryIndex != numberOfCategories)
						whereClause += " OR C.name = :category" + categoryIndex;
					else
						whereClause += " OR C.name = :category" + categoryIndex + " )";
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty())
			whereClause += " AND ( PP.payoutValue > :payoutRangeStart AND PP.payoutValue < :payoutRangeEnd )";

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency()))
			whereClause += " AND ( P.currency = :currency )";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlDistinct + sql + " ) " + orderBy;
		Query q = manager.createQuery(sql, OfferDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getLocations() != null) {
			int lIndex = 0;
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					lIndex += 1;
					q.setParameter("location" + lIndex, location);
					qCount.setParameter("location" + lIndex, location);
				}
		}

		if (dto.getCategories() != null) {
			int index = 0;
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					index += 1;
					q.setParameter("category" + index, category);
					qCount.setParameter("category" + index, category);
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty()) {
			q.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			q.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
			qCount.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			qCount.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
		}

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency())) {
			q.setParameter("currency", dto.getCurrency());
			qCount.setParameter("currency", dto.getCurrency());
		}

		q.setParameter("userID", userID);
		qCount.setParameter("userID", userID);

		if (type.equals("public")) {
			q.setParameter("isPublic", true);
			qCount.setParameter("isPublic", true);
		} else {
			q.setParameter("isPublic", false);
			qCount.setParameter("isPublic", false);
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public OfferDto setPrivateOffer(OfferDto dto) {
		Offer offer = null;

		if (dto.getId() != null) {
			Optional<Offer> offerOptional = offerRepository.findById(dto.getId());
			if (offerOptional.isPresent())
				offer = offerOptional.get();
		}

		if (offer != null) {
			offer.setStatus("APPROVED");
			offer.setIsPublicPayout(false);
			if (offer.getPayoutValue() != null) {
				Product product = productRepository.getOne(offer.getProduct().getId());

				offer.setCurrency(product.getCurrencyPayout());
				for (ProductPayout productPayout : product.getProductPayout())
					if (productPayout.getIsCurrent()) {

						offer.setPayoutValue(productPayout.getPayoutValue());
						break;
					}
				for (OfferPayout offerPayout : offer.getOfferPayout())
					if (offerPayout.getIsCurrent()) {
						offerPayout.setCurrencyPayout(offer.getCurrency());
						break;
					}
				offer.setWebsiteUrl(product.getWebsiteUrl() + "/" + offer.getId());
				offer.setCurrency(product.getCurrency());
			}

			String linkRedirect = "http://localhost:6996/landingPage/" + offer.getId();
			offer.setLinkRedirect(linkRedirect);
			offer = offerRepository.save(offer);
			if (offer != null)
				return new OfferDto(offer, false, false);
		}

		return null;
	}

	@Override
	public OfferDto setPublicOffer(OfferDto dto) {
		Offer offer = null;
		if (dto.getId() != null) {
			Optional<Offer> offerOptional = offerRepository.findById(dto.getId());
			if (offerOptional.isPresent())
				offer = offerOptional.get();
		}
		if (offer != null) {
			offer.setStatus("NEW");
			offer.setIsPublicPayout(true);
			offer.setApplyDate(null);
			offer.setEndDate(null);
			offer.setNote(null);
			if (offer.getPayoutValue() != null) {
				Product product = productRepository.getOne(offer.getProduct().getId());
				offer.setCurrency(product.getCurrencyPayout());
				for (ProductPayout productPayout : product.getProductPayout())
					if (productPayout.getIsCurrent()) {
						offer.setPayoutValue(productPayout.getPayoutValue());
						break;
					}
			}
			offer = offerRepository.save(offer);
			if (offer != null)
				return new OfferDto(offer, false, false);
		}
		return null;
	}

	@Override
	public void changeIsShowOffer(Long id) {
		Offer offer = null;
		Optional<Offer> optionalOffer = offerRepository.findById(id);
		if (optionalOffer.isPresent())
			offer = optionalOffer.get();
		if (offer != null && offer.getIsShow() != null)
			offer.setIsShow(!offer.getIsShow());
		offerRepository.save(offer);
	}

	@Override
	public Page<OfferDto> getAgencyOfferList(OfferSearchDto dto, Long agencyID, String type) {
		if (dto == null)
			return null;

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0)
			pageIndex--;
		else
			pageIndex = 0;

		String whereClause = "";
		String orderBy = " ORDER BY entity.product.createDate DESC ";
		String sqlCount = "SELECT count(DISTINCT entity.id) FROM Offer as entity "
				+ "JOIN Product P ON entity.product.id = P.id " + "JOIN ProductCategory PC ON P.id = PC.product.id "
				+ "JOIN Category C ON PC.category.id = C.id " + "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = :isPublic AND entity.agency.id = :agencyID AND PP.isCurrent = true AND entity.parent IS NULL";
		String sqlDistinct = "SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity   WHERE entity.id in ( ";

		String sql = " SELECT DISTINCT entity.id  FROM Offer AS entity " + "JOIN Product P ON entity.product.id = P.id "
				+ "JOIN ProductCategory PC ON P.id = PC.product.id " + "JOIN Category C ON PC.category.id = C.id "
				+ "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = :isPublic AND entity.agency.id = :agencyID "
				+ " AND PP.isCurrent = true AND entity.parent IS NULL ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.product.name) LIKE UPPER(:text) OR UPPER(entity.product.code) like UPPER(:text) )";

		if (dto.getLocations() != null) {
			int locationIndex = 0;
			int numberOfLocations = dto.getLocations().size();
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					locationIndex += 1;
					if (locationIndex == 1) {
						if (numberOfLocations == 1)
							whereClause += " AND ( P.location = :location" + locationIndex + " )";
						else
							whereClause += " AND ( P.location = :location" + locationIndex;
					} else if (locationIndex != numberOfLocations)
						whereClause += " OR P.location = :location" + locationIndex;
					else
						whereClause += " OR P.location = :location" + locationIndex + " )";
				}
		}

		if (dto.getCategories() != null) {
			int categoryIndex = 0;
			int numberOfCategories = dto.getCategories().size();
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					categoryIndex += 1;
					if (categoryIndex == 1) {
						if (numberOfCategories == 1)
							whereClause += " AND ( C.name = :category" + categoryIndex + " )";
						else
							whereClause += " AND ( C.name = :category" + categoryIndex;
					} else if (categoryIndex != numberOfCategories)
						whereClause += " OR C.name = :category" + categoryIndex;
					else
						whereClause += " OR C.name = :category" + categoryIndex + " )";
				}
		}

		if (dto.getConversionTypes() != null) {
			int conversionTypeIndex = 0;
			int numberOfConversionTypes = dto.getConversionTypes().size();
			for (String conversionType : dto.getConversionTypes())
				if (StringUtils.hasText(conversionType)) {
					conversionTypeIndex += 1;
					if (conversionTypeIndex == 1) {
						if (numberOfConversionTypes == 1)
							whereClause += " AND ( P.conversionType = :conversionType" + conversionTypeIndex + " )";
						else
							whereClause += " AND ( P.conversionType = :conversionType" + conversionTypeIndex;
					} else if (conversionTypeIndex != numberOfConversionTypes)
						whereClause += " OR P.conversionType = :conversionType" + conversionTypeIndex;
					else
						whereClause += " OR P.conversionType = :conversionType" + conversionTypeIndex + " )";
				}
		}

		if (dto.getPayoutRange() != null)
			whereClause += " AND ( PP.payoutValue > :payoutRangeStart AND PP.payoutValue < :payoutRangeEnd )";

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency()))
			whereClause += " AND ( P.currency = :currency )";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlDistinct + sql + " ) " + orderBy;
		Query q = manager.createQuery(sql, OfferDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getLocations() != null) {
			int lIndex = 0;
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					lIndex += 1;
					q.setParameter("location" + lIndex, location);
					qCount.setParameter("location" + lIndex, location);
				}
		}

		if (dto.getCategories() != null) {
			int index = 0;
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					index += 1;
					q.setParameter("category" + index, category);
					qCount.setParameter("category" + index, category);
				}
		}

		if (dto.getConversionTypes() != null) {
			int index = 0;
			for (String conversionType : dto.getConversionTypes())
				if (StringUtils.hasText(conversionType)) {
					index += 1;
					q.setParameter("conversionType" + index, conversionType);
					qCount.setParameter("conversionType" + index, conversionType);
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty()) {
			q.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			q.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
			qCount.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			qCount.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
		}

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency())) {
			q.setParameter("currency", dto.getCurrency());
			qCount.setParameter("currency", dto.getCurrency());
		}

		q.setParameter("agencyID", agencyID);
		qCount.setParameter("agencyID", agencyID);

		if (type.equals("public")) {
			q.setParameter("isPublic", true);
			qCount.setParameter("isPublic", true);
		} else {
			q.setParameter("isPublic", false);
			qCount.setParameter("isPublic", false);
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public Page<OfferDto> searchByPageChildOfOffer(OfferSearchDto dto, Long parentID) {
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
		String sqlCount = "SELECT count(DISTINCT entity.id) FROM Offer as entity "
				+ "JOIN Product P ON entity.product.id = P.id " + "JOIN ProductCategory PC ON P.id = PC.product.id "
				+ "JOIN Category C ON PC.category.id = C.id " + "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = false AND entity.agency.id = :agencyID AND PP.isCurrent = true AND entity.parent.id = :parentID";
		String sqlDistinct = "SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity JOIN Product P ON entity.product.id = P.id  WHERE entity.id in ( ";
		String sql = "SELECT DISTINCT  entity.id FROM Offer as entity " + "JOIN Product P ON entity.product.id = P.id "
				+ "JOIN ProductCategory PC ON P.id = PC.product.id " + "JOIN Category C ON PC.category.id = C.id "
				+ "JOIN ProductPayout PP ON P.id = PP.product.id "
				+ "where entity.isPublicPayout = false AND entity.agency.id = :agencyID AND PP.isCurrent = true AND entity.parent.id = :parentID ";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.product.name) LIKE UPPER(:text) OR UPPER(entity.product.code) like UPPER(:text) )";

		if (dto.getLocations() != null) {
			int locationIndex = 0;
			int numberOfLocations = dto.getLocations().size();
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					locationIndex += 1;
					if (locationIndex == 1) {
						if (numberOfLocations == 1)
							whereClause += " AND ( P.location = :location" + locationIndex + " )";
						else
							whereClause += " AND ( P.location = :location" + locationIndex;
					} else if (locationIndex != numberOfLocations)
						whereClause += " OR P.location = :location" + locationIndex;
					else
						whereClause += " OR P.location = :location" + locationIndex + " )";
				}
		}

		if (dto.getCategories() != null) {
			int categoryIndex = 0;
			int numberOfCategories = dto.getCategories().size();
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					categoryIndex += 1;
					if (categoryIndex == 1) {
						if (numberOfCategories == 1)
							whereClause += " AND ( C.name = :category" + categoryIndex + " )";
						else
							whereClause += " AND ( C.name = :category" + categoryIndex;
					} else if (categoryIndex != numberOfCategories)
						whereClause += " OR C.name = :category" + categoryIndex;
					else
						whereClause += " OR C.name = :category" + categoryIndex + " )";
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty())
			whereClause += " AND ( PP.payoutValue > :payoutRangeStart AND PP.payoutValue < :payoutRangeEnd )";

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency()))
			whereClause += " AND ( P.currency = :currency )";

		if (dto.isTimes())
			orderBy = " ORDER BY entity.createDate ASC ";
		else
			orderBy = " ORDER BY entity.createDate DESC ";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlDistinct + sql + " ) " + orderBy;
		Query q = manager.createQuery(sql, OfferDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getLocations() != null) {
			int lIndex = 0;
			for (String location : dto.getLocations())
				if (StringUtils.hasText(location)) {
					lIndex += 1;
					q.setParameter("location" + lIndex, location);
					qCount.setParameter("location" + lIndex, location);
				}
		}

		if (dto.getCategories() != null) {
			int index = 0;
			for (String category : dto.getCategories())
				if (StringUtils.hasText(category)) {
					index += 1;
					q.setParameter("category" + index, category);
					qCount.setParameter("category" + index, category);
				}
		}

		if (dto.getPayoutRange() != null && !dto.getPayoutRange().isEmpty()) {
			q.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			q.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
			qCount.setParameter("payoutRangeStart", dto.getPayoutRange().get(0));
			qCount.setParameter("payoutRangeEnd", dto.getPayoutRange().get(1));
		}

		if (dto.getCurrency() != null && StringUtils.hasText(dto.getCurrency())) {
			q.setParameter("currency", dto.getCurrency());
			qCount.setParameter("currency", dto.getCurrency());
		}

		q.setParameter("parentID", parentID);
		qCount.setParameter("parentID", parentID);

		q.setParameter("agencyID", dto.getAgencyId());
		qCount.setParameter("agencyID", dto.getAgencyId());

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public OfferDto redirectToWebsite(Long id, HttpServletRequest request, HttpServletResponse response) {

		Offer offer = null;
		if (id != null) {
			Optional<Offer> offerOptional = offerRepository.findById(id);

			if (offerOptional.isPresent())
				offer = offerOptional.get();
		}

		if (offer != null) {
			Cookie cookie = null;
			Cookie[] cookies = null;
			cookies = request.getCookies();
			offer.setIsPublicPayout(true);
			Long count = offer.getCountClick();
			ValidateOffer validateOffer = null;

			if (cookies != null) {
				for (Cookie cookie2 : cookies) {
					if (cookie2.getName().equals("AdvProOffer" + id)) {
						validateOffer = validateOfferRepository.findByValue(cookie2.getValue());
					}
				}
			}

			if (validateOffer == null) {
				UUID uuid = UUID.randomUUID();
				Cookie advProOffer = new Cookie("AdvProOffer" + id, uuid + id.toString());
				advProOffer.setMaxAge(60 * 60 * 3);
				response.addCookie(advProOffer);

				validateOffer = new ValidateOffer();
				validateOffer.setValue(uuid + id.toString());
				validateOffer.setOffer(offer);
				
				validateOfferRepository.save(validateOffer);

				if (count != null) {
					count++;
				} else {
					count = (long) 1.0;
				}
			}

			offer.setCountClick(count);
			offer = offerRepository.save(offer);
			if (offer != null)
				return new OfferDto(offer, false, false);
		}
		return null;
	}
	
	@Override
	public Long getOfferCountClick() {
		//String sql = "SELECT count(entity.countClick) FROM Offer as entity";
		//Long count = (long) manager.createQuery(sql).getMaxResults();
		return offerRepository.sumQuantities();
	}


	@Override
	public List<OfferDto> getNotification() {
		return offerRepository.getNoiti();
	}
		
		@Override
	public Long countOfferPrivate() {
		return offerRepository.countOfferPrivate();
	}
	
	@Override
	public Long countOfferPublic() {
		// TODO Auto-generated method stub
		return offerRepository.countOfferPublic();
	}

	@Override
	public List<AnalticDto> count(String role, Long userId) {
		List<AnalticDto> dtos = new ArrayList<>();
		Session session = getSessionFactory().openSession();
		Transaction tx = session.beginTransaction();
		String sql = "";
		if (userId != null) {
			if(role.equals("ADMIN")) {
				sql = "select sum(of.count_click) as count_click, sum((if(of.status = 'APPROVED', 1, 0))) as count_private, sum((if(of.status = 'NEW', 1, 0))) as count_public  ,\r\n"
						+ " (select count(*) from tbl_product ) as total_product \r\n"
						+ "from  tbl_offer as of	 ";
			}
			else {
				if (role.equals("PRODUCT")) {
					sql = "select sum(of.count_click) as count_click, sum((if(of.status = 'APPROVED', 1, 0))) as count_private, sum((if(of.status = 'NEW', 1, 0))) as count_public  ,"
							+ " (select count(*) from tbl_product where product_manager = :userId) as total_product "
							+ "from  tbl_offer as of where of.agency_id = (select agu.agency_id from tbl_agency_user as agu where agu.user_id = :userId)";
				}
				if (role.equals("USER")) {
					sql = "select sum(of.count_click) as count_click, sum((if(of.status = 'APPROVED', 1, 0))) as count_private, sum((if(of.status = 'NEW', 1, 0))) as count_public  ,"
							+ " (select count(*) from tbl_product where product_manager = (select agu.agency_id from tbl_agency_user as agu where agu.user_id = :userId)) as total_product "
							+ "from  tbl_offer as of where of.agency_id = (select agu.agency_id from tbl_agency_user as agu where agu.user_id = :userId)";
				}
				
			}
			
		
		}
		
		Query query = session.createSQLQuery(sql);
		if (role.equals("PRODUCT") || role.equals("USER")) {
			query.setParameter("userId", userId);
		}
		List<Object[]> result = query.getResultList();
		dtos = getListObjectToDto(result);
		return dtos;
	} 
	
	public List<AnalticDto> getListObjectToDto(List<Object[]> list) {
        List<AnalticDto> result = new ArrayList<>();
        for (Object[] objects : list) {
        	AnalticDto dtoReport = new AnalticDto();
            for (int j = 0; j < 4; j++)
                switch (j) {
                case 0:
                    dtoReport.setCountClick(objects[j] + "");
                    break;
                case 1:
                    dtoReport.setCountOfferPrivate(objects[j] + "");
                    break;
                case 2:
                    dtoReport.setCountOfferPublic(objects[j] + "");
                    break;
                case 3:
                    dtoReport.setTotalProduct(objects[j] + "");
                    break;
               
                default:
                    break;
                }
            result.add(dtoReport);
        }

        return result;
    }

	@Override
	public OfferDto resetCountClick(Long id) {
		if (id != null) {
			Offer offer = offerRepository.getOne(id);
			if (offer != null) {
				offer.setCountClick((long) 0);
				offer = offerRepository.save(offer); 
				
			}
		}
		return null;
		
	}
	
}
