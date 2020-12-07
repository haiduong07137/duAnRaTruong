package com.example.demo.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.domain.Offer;
import com.example.demo.dto.OfferDto;

@Repository
public interface OfferRepository extends JpaRepository<Offer, Long> {
	@Query("SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity WHERE entity.product.id = ?1 AND entity.isPublicPayout = 1")
	public OfferDto getPublicOfferFromProduct(Long id);

	@Query("SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity WHERE entity.agency.id = ?1")
	public List<OfferDto> getOfferFromAgency(Long agencyID);

	@Query("SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity WHERE entity.product.id = ?1 ")
	public List<OfferDto> getOfferFromProduct(Long id);
@Query("SELECT new com.example.demo.dto.OfferDto(entity) FROM Offer as entity  WHERE entity.status = 'USER_REQUESTED'")
	public List<OfferDto> getNoiti(); @Query("SELECT sum(countClick) FROM Offer")
    public Long sumQuantities();
	
	@Query("select count(*) from Offer where isPublicPayout = 1")
    public Long countOfferPublic();
	
	@Query("select count(*) from Offer where isPublicPayout = 0")
    public Long countOfferPrivate();
}


	
