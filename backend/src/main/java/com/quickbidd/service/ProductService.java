package com.quickbidd.service;

import org.springframework.web.multipart.MultipartFile;

import com.quickbidd.model.Product;

public interface ProductService {
	
	void addProduct(Product product, MultipartFile productImmage);

}
