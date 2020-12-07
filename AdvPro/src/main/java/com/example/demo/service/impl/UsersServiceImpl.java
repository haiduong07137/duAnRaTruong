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

import com.example.demo.domain.User;
import com.example.demo.dto.UserDto;
import com.example.demo.dto.seachdto.SearchDto;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@Service
public class UsersServiceImpl implements UserService {
	@Autowired
	EntityManager manager;

	public SessionFactory getSessionFactory() {
		Session session = manager.unwrap(Session.class);
		return session.getSessionFactory();
	}

	@Autowired
	UserRepository userRepository;

	@Override
	public void deleteById(Long id) {
		userRepository.deleteById(id);

	}

	@Override
	public UserDto saveOrUpdate(UserDto dto, Long id) {
		if (dto != null) {
			User entity = null;
			if (id != null) {
				if (dto.getId() != null && !dto.getId().equals(id)) {
					return null;
				}
				entity = userRepository.getOne(id);
				entity.setModifyDate(new Date());
			}
			if (entity == null) {
				entity = new User();
				
			}
			/* Set all the values */
			entity.setActive(true);
			entity.setEmail(dto.getEmail());
			entity.setUsername(dto.getUsername());
			entity.setPassword(dto.getPassword());
			Double price = entity.getMoney()!=null?entity.getMoney():0;
			entity.setMoney(price+dto.getMoney());
			entity = userRepository.save(entity);
			if (entity != null) {
				return new UserDto(entity);
			}
		}

		return null;
	}

	@Override
	public Page<UserDto> searchByPage(SearchDto dto) {
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
			orderBy = " ORDER BY entity." + dto.getOrderBy() + " ASC";
		}

		String sqlCount = "select count(entity.id) from User as entity where (1=1)";
		String sql = "select new com.example.demo.dto.UserDto(entity) from User as entity where (1=1)";

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			whereClause += " AND ( UPPER(entity.username) LIKE UPPER(:text)  ";
		}

		sql += whereClause + orderBy;
		sqlCount += whereClause;

		Query q = manager.createQuery(sql, UserDto.class);
		Query qCount = manager.createQuery(sqlCount);

		if (dto.getKeyword() != null && StringUtils.hasText(dto.getKeyword())) {
			q.setParameter("text", '%' + dto.getKeyword() + '%');
			qCount.setParameter("text", '%' + dto.getKeyword() + '%');
		}

		int startPosition = pageIndex * pageSize;
		q.setFirstResult(startPosition);
		q.setMaxResults(pageSize);
		List<UserDto> entities = q.getResultList();
		long count = (long) qCount.getSingleResult(); 

		Pageable pageable = PageRequest.of(pageIndex, pageSize);
		Page<UserDto> result = new PageImpl<UserDto>(entities, pageable, count);
		return result;
	}

	@Override
	public UserDto getOne(Long id) {
		User entity = userRepository.getOne(id);

		if (entity != null) {
			return new UserDto(entity);
		}

		return null;
	}

	@Override
	public UserDto checkLogin(UserDto dto) {
		User user = userRepository.findByUsername(dto.getUsername());
		if (user != null && user.getId() != null) {
			if (dto.getUsername() != null && StringUtils.hasText(dto.getUsername().toString())) {
				if (dto.getUsername().equals(user.getUsername())) {
					if (dto.getPassword().equals(user.getPassword())) {
						return new UserDto(user);
					}
				}
			}
		}
		return null;
	}

}
