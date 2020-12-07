package com.example.demo.service.impl;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.example.demo.domain.Category;
import com.example.demo.domain.ProductCategory;
import com.example.demo.dto.CategoryDto;
import com.example.demo.dto.seachdto.CategorySearchDto;
import com.example.demo.repository.CategoryRepository;
import com.example.demo.repository.ProductCategoryRepository;
import com.example.demo.service.CategoryService;

@Service
public class CategoryServiceImpl   implements CategoryService {

	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}
	@Autowired
	CategoryRepository categoryRepository;
	@Autowired
	ProductCategoryRepository productCategoryRepository;

	@Override
	public CategoryDto saveOne(CategoryDto dto, Long id) {
		if (dto != null) {
			Category entity = null;
			if (id != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity =  categoryRepository.getOne(id);
				entity.setModifyDate(new Date());
			}
			if (entity == null) {
				entity = new Category();
				entity.setCreateDate(new Date());
			}
			
			/* Set all the values */
			entity.setName(dto.getName());
			entity.setCode(dto.getCode());
			if (entity.getId() != null) {
				entity.setModifyDate(new Date());
			} else {
				entity.setCreateDate(new Date());
				entity.setModifyDate(new Date());
			}
			entity = categoryRepository.save(entity);
			
			if (entity != null) {
				return new CategoryDto(entity);
			}
		}
		
		return null;
	}
	
	@Override
	public CategoryDto getOne(Long id) {
		Category entity = categoryRepository.getOne(id);
		
		if (entity != null) {
			return new CategoryDto(entity);
		}
		
		return null;
	}
	
	@Override
	public Page<CategoryDto> searchByPage(CategorySearchDto dto) {
		if (dto == null) {
			return null;
		}

		int pageIndex = dto.getPageIndex();
		int pageSize = dto.getPageSize();

		if (pageIndex > 0) {
			pageIndex--;
		} else {
			pageIndex = 0;
		}

		String whereClause = "";
		
		String orderBy = " ORDER BY entity.id DESC";
		if (dto.getOrderBy() != null && StringUtils.hasLength(dto.getOrderBy().toString())) {
			orderBy = " ORDER BY entity."+dto.getOrderBy()+" ASC";
		}
		
		String sqlCount = "select count(entity.id) from Category as entity where (1=1)";
		String sql = "select new com.example.demo.dto.CategoryDto(entity) from Category as entity where (1=1)";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.code) LIKE UPPER(:text) )";
		}


		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, CategoryDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}
		


		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<CategoryDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult(); 

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<CategoryDto> result = new PageImpl<CategoryDto>(entities, pageable, count);
		return result;
	}
	
	@Override
	public void deleteById(Long id) {
		categoryRepository.deleteById(id);
		
	}
	
	
	@Override
	public boolean checkCodeWasUsed(String code, Long id) {
		List<Category> category = categoryRepository.findByCode(code);
		if (category != null && category.size() > 0 && category.get(0) != null && category.get(0).getId() != null) {
			if (id != null && StringUtils.hasText(id.toString())) {
				if (category.get(0).getId().equals(id)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	
	@Override
	public boolean checkNameWasUsed(String name, Long id) {
		List<Category> category = categoryRepository.findByName(name);
		if (category != null && category.size() > 0 && category.get(0) != null && category.get(0).getId() != null) {
			if (id != null && StringUtils.hasText(id.toString())) {
				if (category.get(0).getId().equals(id)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}
	
	
	@Override
	public boolean deleteCheckById(Long id) {
		List<ProductCategory> listP = productCategoryRepository.findAll();
		for(ProductCategory p: listP) {
			
						if(id != null && id.equals(p.getCategory().getId())) {
							return false;
						}
				}
		Long count = categoryRepository.checkcategory(id);
		if(count == null || count <=0) {
			return true;
		}
		return false;
	}
	
	
	@Override
	public void deleteMultiple(List<Long> idList) {
		for (Long id : idList) {
			categoryRepository.deleteById(id);

		}
	}
}
