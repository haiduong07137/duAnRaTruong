package com.example.demo.service.impl;

import java.util.Date;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.demo.domain.Offer;
import com.example.demo.domain.ValidateOffer;
import com.example.demo.dto.ValidateDto;
import com.example.demo.dto.seachdto.SearchDto;
import com.example.demo.repository.OfferRepository;
import com.example.demo.repository.ValidateRepository;
import com.example.demo.service.ValidateService;

@Service
public class ValidateServiceImpl implements ValidateService {

	@Autowired
	ValidateRepository validateRepository;
	@Autowired
	OfferRepository offerRepository;
	@Autowired
	EntityManager manager;

	@Override
	public void deleteById(Long id) {
		validateRepository.deleteById(id);
	}

	@Override
	public ValidateDto createOrUpdateValidate(ValidateDto validateDto, Long id) {

		if (validateDto != null) {
			ValidateOffer validateOffer = null;

			if (id != null) {
				if (!validateDto.getId().equals(id) && validateDto.getId() == null) {
					return null;
				}
				validateOffer = (ValidateOffer) validateRepository.findById(id).get();
				validateOffer.setModifyDate(new Date());
			}

			if (validateOffer == null) {				
				validateOffer = new ValidateOffer();
				validateOffer.setCreateDate(new Date());
				validateOffer.setModifyDate(new Date());
			}

			validateOffer.setId(id);
			validateOffer.setKeyLock(validateDto.getKeyLock());
			validateOffer.setValue(validateDto.getValue());
			Offer offer = offerRepository.getOne(validateDto.getIdOffer());
			validateOffer.setOffer(offer);

			ValidateOffer validateOffer2 = validateRepository.save(validateOffer);
			return validateOffer2 != null ? new ValidateDto(validateOffer) : null;
		}

		return null;
	}

	@Override
	public Page<SearchDto> searchValidate(SearchDto serSearchDto) {
		if (serSearchDto == null)
			return null;

		int pageIndex = serSearchDto.getPageIndex();
		int pageSize = serSearchDto.getPageSize();

		pageIndex = pageIndex > 0 ? --pageIndex : 0;

		String clause = "";

		String sql = "select new com.example.demo.dto.ValidateDto(entity) from ValidateOffer as entity where (1=1) ";
		String sqlCount = "select count(entity.id) from ValidateOffer as entity where (1=1) ";

		if (serSearchDto.getKeyword() != null) {
			clause += " AND ( entity.keyLock LIKE :text OR entity.value LIKE :text ) ";
		}

		Query q = manager.createQuery(sql + clause, ValidateDto.class);
		Query qCount = manager.createQuery(sqlCount + clause);

		if (serSearchDto.getKeyword() != null) {
			q.setParameter("text", '%' + serSearchDto.getKeyword() + '%');
			qCount.setParameter("text", '%' + serSearchDto.getKeyword() + '%');
		}

		int indexTable = pageSize * pageIndex;
		q.setFirstResult(indexTable);
		q.setMaxResults(pageSize);

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		List<SearchDto> list = q.getResultList();

		Page<SearchDto> page = new PageImpl<SearchDto>(list, pageable, (long) qCount.getSingleResult());

		return page;
	}

	@Override
	public ValidateDto findById(Long id) {
		ValidateOffer validateOffer = validateRepository.findById(id).get();
		return new ValidateDto(validateOffer);
	}
}
