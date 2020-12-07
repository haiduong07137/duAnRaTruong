package com.example.demo.service.impl;

import java.util.Date;
import java.util.List;

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

import com.example.demo.domain.Lead;
import com.example.demo.domain.Offer;
import com.example.demo.domain.User;
import com.example.demo.dto.LeadDto;
import com.example.demo.dto.OfferDto;
import com.example.demo.dto.UserDto;
import com.example.demo.dto.seachdto.SearchDto;
import com.example.demo.repository.LeadRepository;
import com.example.demo.repository.OfferRepository;
import com.example.demo.service.LeadService;

@Service
public class LeadServiceImpl implements LeadService {
	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	@Autowired
	LeadRepository leadRepository;

	@Autowired
	OfferRepository offerRepository;

	@Override
	public void deleteById(Long id) {
		leadRepository.deleteById(id);

	}

	@Override
	public LeadDto saveOrUpdate(LeadDto dto, Long id) {
		if (dto != null) {
			Lead entity = null;
			if (id != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = leadRepository.getOne(id);
				entity.setModifyDate(new Date());
			}
			if (entity == null) {
				entity = new Lead();
				entity.setCreateDate(new Date());
			}

			/* Set all the values */
			entity.setName(dto.getName());
			entity.setPhone(dto.getPhone());
			entity.setMessage(dto.getMessage());
			Offer offer = offerRepository.getOne(dto.getIdOffer());
			entity.setOffer(offer);
			if (entity.getId() != null) {
				entity.setModifyDate(new Date());
			} else {
				entity.setModifyDate(new Date());
				entity.setCreateDate(new Date());
			}
			entity = leadRepository.save(entity);
			if (entity != null) {
				return new LeadDto(entity);
			}
		}

		return null;
	}

	@Override
	public Page<LeadDto> searchByPage(SearchDto dto) {

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

		String orderBy = " ORDER BY createDate.id DESC";
		
		if (dto.getOrderBy() != null && StringUtils.hasLength(dto.getOrderBy().toString())) {
			orderBy = " ORDER BY entity." + dto.getOrderBy() + " ASC";
		}

		String sqlCount = "select count(entity.id) from Lead as entity where (1=1)";
		String sql = "select new com.example.demo.dto.LeadDto(entity) from Lead as entity where (1=1)";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( UPPER(entity.name) LIKE UPPER(:text) OR UPPER(entity.phone) LIKE UPPER(:text)  ) ";
		}

		if (dto.getId() != null) {
			whereClause += " AND (  entity.offer.id = :id ) ";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, LeadDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		if (dto.getId() != null) {
			q.setParameter("id", Long.parseLong(dto.getId().toString()));
			qCount.setParameter("id", Long.parseLong(dto.getId().toString()));
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<LeadDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<LeadDto> result = new PageImpl<LeadDto>(entities, pageable, count);
		
		return result;
	}

	@Override
	public LeadDto getOne(Long id) {
		Lead entity = leadRepository.getOne(id);

		if (entity != null) {
			return new LeadDto(entity);
		}

		return null;
	}

}
