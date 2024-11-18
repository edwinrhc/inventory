package com.company.inventory.service;

import com.company.inventory.model.Product;
import com.company.inventory.response.ProductResponseRest;
import org.springframework.http.ResponseEntity;

public interface IProductService {

    public ResponseEntity<ProductResponseRest> save(Product product, Long categoryId);
    public ResponseEntity<ProductResponseRest> searchById(Long id);

    public ResponseEntity<ProductResponseRest> searchByName(String name);

    public ResponseEntity<ProductResponseRest> deletebyId(Long id);

    public ResponseEntity<ProductResponseRest> findAll();

//    public ResponseEntity<ProductResponseRest>searchByAccount(int account);
}
