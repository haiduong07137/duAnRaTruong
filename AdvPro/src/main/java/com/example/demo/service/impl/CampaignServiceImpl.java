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

import com.example.demo.domain.Campaign;
import com.example.demo.dto.CampaignDto;
import com.example.demo.dto.seachdto.CampaignSeachdto;
import com.example.demo.repository.CampaignRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.service.CampaignService;
@Service
public class CampaignServiceImpl implements CampaignService {

	
	@Autowired
	EntityManager manager;
	
	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}
	
	
	@Autowired
	CampaignRepository campaignRepository;
	
	@Autowired
	ProductRepository productRepository;
	
	
	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		campaignRepository.deleteById(id);
		
	}

	@Override
	public Page<CampaignDto> searchByPage(CampaignSeachdto dto) {
	
		// TODO Auto-generated method stub
		if(dto == null) {
			return null;
		}
	
		int pageIndex=dto.getPageIndex();
		int pageSize=dto.getPageSize();
		if(pageIndex>0) {
			pageIndex--;
		}else {
			pageIndex=0;
		}
		String whereClause="";
		String orderBy="  ORDER BY entity.id DESC";
		if(dto.getOrderBy()!=null && StringUtils.hasLength(dto.getOrderBy().toString())) {
			orderBy = " ORDER BY entity."+dto.getOrderBy()+" ASC";
		}
		String sqlCount="select count(entity.id) from Campaign  as entity  where (1=1) ";
		String sql = "select new com.example.demo.dto.CampaignDto(entity) from Campaign as entity where (1=1) ";
		
		if(dto.getKeyword()!=null && StringUtils.hasText(dto.getKeyword())) {
			whereClause+="  and (upper(entity.name)like upper(:text)) ";
		}
		sql +=whereClause+orderBy;
		sqlCount += whereClause;
		
		
		Query query = manager.createQuery(sql,CampaignDto.class);
		Query qCount= manager.createQuery(sqlCount);
		if(dto.getKeyword() !=null && StringUtils.hasText(dto.getKeyword())) {
			query.setParameter("text", "%" +dto.getKeyword()+"%" );
			qCount.setParameter("text", "%"+dto.getKeyword()+"%");
		}
		int startPostion= pageIndex*pageSize;
		query.setFirstResult(startPostion);
		query.setMaxResults(pageSize);
		
		List<CampaignDto> list = query.getResultList();
		long count= (long) qCount.getSingleResult();
		
		Pageable pageable= PageRequest.of(pageIndex, pageSize);
		Page<CampaignDto>  result= new PageImpl<CampaignDto>(list,pageable,count);
		
		
		
		return result;
	}

	@Override
	public CampaignDto getOne(Long id) {
		// TODO Auto-generated method stub
		Campaign entity= campaignRepository.getOne(id);
		if(entity!=null) {	
			return new CampaignDto(entity);
		}
		return null;
	}

	@Override
	public CampaignDto saveOne(CampaignDto dto, Long id) {
		// TODO Auto-generated method stub

		if(dto !=null) {
	
			Campaign entity= null;
			if(id !=null) {
			
				if(dto.getId()!=null && !dto.getId().equals(id)) {
					return null;
				}
		
				entity= campaignRepository.getOne(id);
				entity.setModifyDate(new Date());
			}
		
			if(entity == null) {
				entity= new Campaign();
				entity.setCreateDate(new Date());
			}
			
			entity.setName(dto.getName());
			entity.setPrice(dto.getPrice());
			entity.setFromDate(dto.getFromDate());
			entity.setToDate(dto.getToDate());
			entity.setProduct(productRepository.getOne(dto.getProduct_Id()));
		
			
			entity= campaignRepository.save(entity);
			if(entity !=null) {
				return new CampaignDto(entity);
			}
		}
		
		
		return null;
	}

}
