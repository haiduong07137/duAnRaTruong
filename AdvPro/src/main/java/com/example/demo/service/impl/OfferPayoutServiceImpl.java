package com.example.demo.service.impl;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.OfferPayout;
import com.example.demo.dto.OfferPayoutDto;
import com.example.demo.dto.seachdto.OfferPayoutSearchDto;
import com.example.demo.repository.OfferPayoutRepository;
import com.example.demo.service.OfferPayoutService; 

@Service
public class OfferPayoutServiceImpl   implements OfferPayoutService {
	@Autowired
	OfferPayoutRepository offerPayoutRepository;

	@Autowired
	EntityManager manager;

	@Override
	public Page<OfferPayoutDto> getHistoryOfPrivateOfferPayout(OfferPayoutSearchDto dto) {
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
		String orderBy = " ORDER BY entity.createDate DESC ";

		String sqlCount = "select count(entity.id) from OfferPayout as entity where (1=1) ";

		String sql = "select new com.example.demo.dto.OfferPayoutDto(entity) "
				+ "FROM OfferPayout as entity where (1=1) ";

		if (dto.getId() != null) {
			whereClause += " AND entity.offer.id =:offerId";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, OfferPayoutDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getId() != null) {
			q.setParameter("offerId", dto.getId());
			qCount.setParameter("offerId", dto.getId());
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<OfferPayoutDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<OfferPayoutDto> result = new PageImpl<OfferPayoutDto>(entities, pageable, count);
		return result;
	}

	@Override
	public List<OfferPayoutDto> findAll(OfferPayoutSearchDto dto) {

		if (dto == null) {
			return null;
		}
//
//		String whereClause = "";
//		String orderBy = " ORDER BY entity.createDate DESC ";
//
//		String sql = "select new com.example.demo.dto.OfferPayoutDto(entity) from OfferPayout as entity where (1=1) ";
//
//		sql += whereClause + orderBy;
//
//		Query q = manager.createQuery(sql, OfferPayoutDto.class);
//
//		List<OfferPayoutDto> entities = q.getResultList();
//
//		return entities;

		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";

		String sqlCount = "select count(entity.id) from OfferPayout as entity where (1=1) ";

		String sql = "select new com.example.demo.dto.OfferPayoutDto(entity) "
				+ "FROM OfferPayout as entity where (1=1) ";

		if (dto.getId() != null) {
			whereClause += " AND entity.offer.id =:offerId";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, OfferPayoutDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getId() != null) {
			q.setParameter("offerId", dto.getId());
			qCount.setParameter("offerId", dto.getId());
		}

		List<OfferPayoutDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult();
		return entities;
	}

	@Override
	public List<OfferPayoutDto> getListHistoryByAgency(UUID agencyId) {
		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";

		String sql = "select new com.example.demo.dto.OfferPayoutDto(entity) "
				+ "FROM OfferPayout as entity where (1=1) ";

		if (agencyId != null) {
			whereClause += " AND entity.offer.agency.id =:agencyId";
		}

		sql += whereClause + orderBy;

		Query q = manager.createQuery(sql, OfferPayoutDto.class);

		if (agencyId != null) {
			q.setParameter("agencyId", agencyId);
		}

		List<OfferPayoutDto> entities = q.getResultList();
		return entities;

	}

	public List<OfferPayoutDto> getListHistoryOffer(Long long1) {
		String whereClause = "";
		String orderBy = " ORDER BY entity.createDate DESC ";

		String sql = "select new com.example.demo.dto.OfferPayoutDto(entity) "
				+ "FROM OfferPayout as entity where (1=1) ";

		if (long1 != null) {
			whereClause += " AND entity.offer.id =:offerID";
		}

		sql += whereClause + orderBy;

		Query q = manager.createQuery(sql, OfferPayoutDto.class);

		if (long1 != null) {
			q.setParameter("offerID", long1);
		}

		List<OfferPayoutDto> entities = q.getResultList();
		return entities;

	}

}
