package com.example.demo.service.impl;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.Query;

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

import com.example.demo.domain.Category;
import com.example.demo.domain.LandingPage;
import com.example.demo.domain.Offer;
import com.example.demo.domain.Product;
import com.example.demo.domain.ProductCategory;
import com.example.demo.domain.ProductPayout;
import com.example.demo.dto.AgencyDto;
import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.LandingPageDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.ProductCategoryDto;
import com.example.demo.dto.ProductDto;
import com.example.demo.dto.ProductPayoutDto;
import com.example.demo.dto.seachdto.AgencySearchDto;
import com.example.demo.dto.seachdto.ProductSearchDto;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.LandingPageRepository;
import com.example.demo.repository.OfferRepository;
import com.example.demo.repository.ProductCategoryRepository;
import com.example.demo.repository.ProductPayoutRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.ValidateOfferRepository;
import com.example.demo.service.ProductService;
import com.example.demo.service.UserService;

@Service
public class ProductServiceImpl implements ProductService {
	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	@Autowired
	ProductRepository productRepository;

	@Autowired
	OfferRepository offerRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	OfferServiceImpl offerServiceImpl;

	@Autowired
	AgencyServiceImpl agencyServiceImpl;

	@Autowired
	ProductPayoutRepository productPayoutRepository;

//    @Autowired
//    LandingPageRepository landingPageRepository;

	@Autowired
	CategoryRepository categoryRepository;

	@Autowired
	ProductCategoryRepository productCategoryRepository;

	@Value("${attachment.path}")
	private String attachmentPath;

	@Override
	public Page<ProductDto> searchByPage(ProductSearchDto dto) {

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

		// Order with Distinct
		String sqlOrder = "SELECT new com.example.demo.dto.ProductDto(entity) FROM Product entity WHERE entity.id in ( ";
		String sqlCount = "select count(DISTINCT entity.id) from Product as entity  JOIN ProductCategory PC ON entity.id = PC.product.id  JOIN Category C ON PC.category.id = C.id where (1=1)";
		String sql = "select DISTINCT entity.id from Product entity"
				+ "  JOIN ProductCategory PC ON entity.id = PC.product.id  JOIN Category C ON PC.category.id = C.id where (1=1)";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.code) LIKE UPPER(:text)  )";

		if (dto.getUserId() != null)
			whereClause += " AND ( entity.product_manager.id = :userId )";

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

		if (dto.getPrice() != null)
			whereClause += " AND entity.price = :price";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlOrder + sql + " ) " + orderBy;

		Query q = manager.createQuery(sql, ProductDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getUserId() != null) {
			q.setParameter("userId", dto.getUserId());
			qCount.setParameter("userId", dto.getUserId());
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

		if (dto.getPrice() != null) {
			q.setParameter("price", dto.getPrice());
			qCount.setParameter("price", dto.getPrice());
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<ProductDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();
		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<ProductDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public ProductDto getOne(Long id) {
		Product entity = productRepository.getOne(id);

		if (entity != null)
			return new ProductDto(entity);

		return null;
	}

	@Override
	public ProductDto saveOneOrUpdate(ProductDto dto, Long id) {
		if (dto != null) {
			Product entity = null;
			if (id != null) {
				if (dto.getId() != null && !dto.getId().equals(id))
					return null;
				entity = productRepository.getOne(id);
			}
			if (entity == null)
				entity = new Product();

			/* Set all the values */
			entity.setName(dto.getName());
			entity.setCode(dto.getCode());
			entity.setMainImageUrl(dto.getMainImageUrl());
			entity.setDescription(dto.getDescription());
			entity.setPrice(dto.getPrice());
			entity.setProduct_manager(userRepository.getOne(dto.getUserId()));
			entity.setCurrency(dto.getCurrency());
			if (entity.getId() != null) {
				entity.setModifyDate(new Date());
			} else {
				entity.setModifyDate(new Date());
				entity.setCreateDate(new Date());

			}
			entity.setWebsiteUrl(dto.getWebsiteUrl());
			entity.setCurrencyPayout(dto.getCurrencyPayout());
			if (dto.getIsShow() != null)
				entity.setIsShow(dto.getIsShow());
			else
				entity.setIsShow(true);
			Set<ProductPayout> productPayouts = new HashSet<>();
			Set<ProductCategory> productCategories = new HashSet<>();
			Set<LandingPage> landingPages = new HashSet<>();

			/* List of all the new categories */
			Set<Long> newCategoryIDs = new HashSet<>();

			if (dto.getProductPayouts() != null && !dto.getProductPayouts().isEmpty())
				for (ProductPayoutDto productPayoutDto : dto.getProductPayouts()) {
					ProductPayout productPayout = productPayoutRepository.getOne(productPayoutDto.getId());
					if (productPayout.getIsCurrent())
						productPayout.setIsCurrent(false);
					productPayouts.add(productPayout);
				}

			/* Xóa các product category mà người dùng đã xóa */
			if (dto.getId() != null && dto.getCategories() != null && !dto.getCategories().isEmpty()) {

				/* Filter product category that has ID */
				List<Long> categoryIDs = dto.getCategories().stream().map(category -> category.getId())
						.collect(Collectors.toList());

				List<Long> currentProductCategoryIDs = new ArrayList<>();

				for (Long categoryID : categoryIDs) {
					ProductCategory productCategory = productCategoryRepository
							.getProductCategoryFromCategoryIdAndProductId(categoryID, dto.getId());
					if (productCategory != null) {
						currentProductCategoryIDs.add(productCategory.getId());
						/* If product category exists, add it */
						productCategories.add(productCategory);
					} else
						/* List of the IDs of the categories yet to be added */
						newCategoryIDs.add(categoryID);
				}

				/* Get all product category of that product */
				List<Long> oldProductCategoriesID = productCategoryRepository
						.getProductCategoryFromProductId(dto.getId());

				/* Comparing all the IDs - Return a list of IDs that were deleted */
				List<Long> deletedIDs = oldProductCategoriesID.stream()
						.filter(oldId -> !currentProductCategoryIDs.contains(oldId)).collect(Collectors.toList());

				/* Delete all deleted product categories */
				for (Long deletedID : deletedIDs)
					productCategoryRepository.deleteById(deletedID);
			} else if (dto.getCategories() != null && !dto.getCategories().isEmpty())
				newCategoryIDs = dto.getCategories().stream().map(category -> category.getId())
						.collect(Collectors.toSet());

			/* Xóa các landing pages mà người dùng đã xóa */
			if (dto.getId() != null && dto.getLandingPages() != null && !dto.getLandingPages().isEmpty()) {

				/* Filter landing pages that has ID */
				List<Long> currentLandingPagesID = dto.getLandingPages().stream()
						.filter(landingPage -> landingPage.getId() != null).map(landingPage -> landingPage.getId())
						.collect(Collectors.toList());

				/* Get all landing pages of that product */
//		List<Long> oldLandingPagesID = landingPageRepository.getLandingPages(dto.getId());

				/* Comparing all the IDs - Return a list of IDs that were deleted */
//		List<Long> deletedIDs = oldLandingPagesID.stream()
//			.filter(oldId -> !currentLandingPagesID.contains(oldId)).collect(Collectors.toList());

				/* Delete all the unnecessary landing pages */
//		for (Long deletedID : deletedIDs)
//		    landingPageRepository.deleteById(deletedID);
			}

			/* Sửa các landing pages */
//	    if (dto.getLandingPages() != null && !dto.getLandingPages().isEmpty())
//		for (LandingPageDto landingPageDto : dto.getLandingPages())
//		    if (landingPageDto.getId() != null) {
//			LandingPage landingPage = landingPageRepository.getOne(landingPageDto.getId());
//			landingPage.setIsShow(landingPageDto.getIsShow());
//			landingPage.setType(landingPageDto.getType());
//			landingPage.setUrl(landingPageDto.getUrl());
//			landingPages.add(landingPage);
//		    }

			entity.setProductPayout(productPayouts);
			entity.setLandingPage(landingPages);
			entity.setProductCategory(productCategories);

			entity = productRepository.save(entity);

			if (entity != null) {
				/* Thêm product payout */
				ProductPayout currentPayout = new ProductPayout();
				currentPayout.setIsCurrent(true);
				currentPayout.setPayoutValue(dto.getCurrentPayout());
				currentPayout.setProduct(entity);
				if (currentPayout.getId() != null) {
					currentPayout.setModifyDate(new Date());
				} else {
					currentPayout.setCreateDate(new Date());
					currentPayout.setModifyDate(new Date());
				}
				productPayoutRepository.save(currentPayout);

				/* Thêm product category nếu cần */
				if (!newCategoryIDs.isEmpty())
					for (Long newId : newCategoryIDs) {
						ProductCategory productCategory = new ProductCategory();
						Category category = categoryRepository.getOne(newId);
						productCategory.setCategory(category);
						productCategory.setProduct(entity);
						if (productCategory.getId() != null) {
							productCategory.setModifyDate(new Date());
						} else {
							productCategory.setCreateDate(new Date());
							productCategory.setModifyDate(new Date());
						}
						productCategoryRepository.save(productCategory);
					}

				/* Thêm các landing pages nếu cần */
//		if (dto.getLandingPages() != null && !dto.getLandingPages().isEmpty())
//		    for (LandingPageDto landingPageDto : dto.getLandingPages())
//			if (landingPageDto.getId() == null) {
//			    LandingPage landingPage = new LandingPage();
//			    landingPage.setProduct(entity);
//			    landingPage.setIsShow(landingPageDto.getIsShow());
//			    landingPage.setType(landingPageDto.getType());
//			    landingPage.setUrl(landingPageDto.getUrl());
//			    landingPageRepository.save(landingPage);
//			}

				return new ProductDto(entity);
			}
		}

		return null;
	}

	@Override
	public void deleteById(Long id) {
		productRepository.deleteById(id);

		String absolutePath = attachmentPath + "product/" + id;
		File folder = new File(absolutePath);

		if (folder.listFiles() != null) {
			for (File file : folder.listFiles())
				file.delete();
			folder.delete();
		}
	}

	@Override
	public OfferDto getPublicOffer(Long id) {
		OfferDto offer = offerRepository.getPublicOfferFromProduct(id);

		return offer;
	}

	@Override
	public boolean checkCodeWasUsed(String code, Long id) {
		List<Product> product = productRepository.findByCode(code);
		if (product != null && product.size() > 0 && product.get(0) != null && product.get(0).getId() != null) {
			if (id != null && StringUtils.hasText(id.toString()))
				if (product.get(0).getId().equals(id))
					return false;
			return true;
		}
		return false;
	}

	@Override
	public Page<ProductDto> getPageProductAgencyDontHave(ProductSearchDto dto, Long agencyID) {
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

		// order with distinct
		String sqlOrder = "SELECT new com.example.demo.dto.ProductDto(entity) FROM Product entity WHERE entity.id in ( ";
		String sqlCount = "select count(DISTINCT entity.id) FROM Product as entity where (1=1) and entity.id not in (select entity2.product.id FROM Offer as entity2 where entity2.agency.id = :agencyID ) ";
		String sql = "SELECT DISTINCT entity.id FROM Product as entity where (1=1) " + " and entity.id not in "
				+ " (select entity2.product.id FROM Offer as entity2 where entity2.agency.id = :agencyID )";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword()))
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.code) LIKE UPPER(:text)  )";

		sql += whereClause;
		sqlCount += whereClause;
		sql = sqlOrder + sql + " ) " + orderBy;

		Query q = manager.createQuery(sql, ProductDto.class);
		Query qCount = manager.createQuery(sqlCount);

		q.setParameter("agencyID", agencyID);
		qCount.setParameter("agencyID", agencyID);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<ProductDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<ProductDto> result = new PageImpl<>(entities, pageable, count);
		return result;
	}

	@Override
	public ProductDto updateImage(String mainImageUrl, Long id) {
		Product entity = productRepository.getOne(id);
		entity.setMainImageUrl(mainImageUrl);
		entity = productRepository.save(entity);

		return new ProductDto(entity);
	}

	@Override
	public void changeIsShowOffer(Long id) {
		Product product = null;
		List<OfferDto> listOffer = offerRepository.getOfferFromProduct(id);

		Optional<Product> optionalProduct = productRepository.findById(id);
		if (optionalProduct.isPresent())
			product = optionalProduct.get();
		if (product != null && product.getIsShow() != null) {
			product.setIsShow(!product.getIsShow());
			productRepository.save(product);

//	    for(OfferDto obj: listOffer) {
//		Offer offer = null;
//		Optional<Offer> optionalOffer = offerRepository.findById(obj.getId());
//		if (optionalOffer.isPresent())
//		    offer = optionalOffer.get();
//		if (offer != null && offer.getIsShow() != null)
//		    offer.setIsShow(product.getIsShow());
//	    }
		}

	}

	@Override
	public List<String> getLocationList() {
		return null;
	}

	@Override
	public List<String> getConversionTypeList() {

		return null;
	}

	@Override
	public void addMultipleOfferToAgency(List<AgencyDto> listId, Long productId) {
		ProductDto product = getOne(productId);

		for (AgencyDto agency : listId) {
			OfferDto offer = new OfferDto();
			offer.setAgency(agency);
			offer.setPayoutValue(product.getCurrentPayout());
			offer.setCurrency(product.getCurrencyPayout());
			offer.setIsShow(product.getIsShow());
			offer.setProduct(product);
			OfferDto abc = offerServiceImpl.saveOrUpdate(offer, null);

		}
	}

	@Override
	public void addOfferToAllAgency(Long productId) {
		ProductDto product = getOne(productId);
		AgencySearchDto asd = new AgencySearchDto();
		asd.setProductId(productId);
		asd.setPageSize(99999999);
		Page<AgencyDto> listAgency = agencyServiceImpl.getPageAgencyDontHaveProductThis(asd);
		for (AgencyDto agency : listAgency.getContent()) {
			OfferDto offer = new OfferDto();
			offer.setAgency(agency);
			offer.setPayoutValue(product.getCurrentPayout());
			offer.setCurrency(product.getCurrencyPayout());
			offer.setIsShow(product.getIsShow());
			offer.setProduct(product);
			offerServiceImpl.saveOrUpdate(offer, null);
		}
	}

	@Override
	public List<CategoryDto> getListcategoriesAuto() {
		String sqlConversionTypeList = "SELECT DISTINCT new com.example.demo.dto.CategoryDto(entity.category)  from ProductCategory as entity where(1=1)";
		Query qConversionType = manager.createQuery(sqlConversionTypeList, CategoryDto.class);
		List<CategoryDto> conversionTypeList = qConversionType.getResultList();

		return conversionTypeList;
	}

	@Override
	public List<ProductDto> getAllProduct() {
		List<ProductDto> dtos = new ArrayList<>();
		List<Product> products = productRepository.findAll();
		for (Product product : products) {
			ProductDto dto = new ProductDto();
			dto.setId(product.getId());
			dtos.add(dto);
		}
		return dtos;
	}

	
}
