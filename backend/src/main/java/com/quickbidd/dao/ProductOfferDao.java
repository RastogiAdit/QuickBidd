package com.quickbidd.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.quickbidd.model.Product;
import com.quickbidd.model.ProductOffer;
import com.quickbidd.model.User;

@Repository
public interface ProductOfferDao extends JpaRepository<ProductOffer, Integer> {
	
	List<ProductOffer> findByProduct(Product product);
	List<ProductOffer> findByUser(User user);

}
