package com.company.inventory.controller;

import com.company.inventory.model.Product;
import com.company.inventory.response.CategoryResponseRest;
import com.company.inventory.response.ProductResponseRest;
import com.company.inventory.service.IProductService;
import com.company.inventory.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class ProductRestController {

    @Autowired
    IProductService service;

    /**
     * @param picture
     * @param name
     * @param price
     * @param account
     * @param categoryId
     * @return
     * @throws IOException
     */
    @PostMapping("/products")
    public ResponseEntity<ProductResponseRest> saveProduct(
            @RequestParam("picture") MultipartFile picture,
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("account") int account,
            @RequestParam("categoryId") Long categoryId) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setAccount(account);
        product.setPicture(Util.compressZLib(picture.getBytes()));

        ResponseEntity<ProductResponseRest> response = service.save(product, categoryId);

        return response;
    }

    /**
     * update product
     * @param picture
     * @param name
     * @param price
     * @param account
     * @param categoryId
     * @param id
     * @return
     * @throws IOException
     */
    @PutMapping("/products/{id}")
    public ResponseEntity<ProductResponseRest> updateProduct(
            @RequestParam("picture") MultipartFile picture,
            @RequestParam("name") String name,
            @RequestParam("price") int price,
            @RequestParam("account") int account,
            @RequestParam("categoryId") Long categoryId,
            @PathVariable Long id
            ) throws IOException {

        Product product = new Product();
        product.setName(name);
        product.setPrice(price);
        product.setAccount(account);
        product.setPicture(Util.compressZLib(picture.getBytes()));

        ResponseEntity<ProductResponseRest> response = service.update(product, categoryId, id);

        return response;
    }

    /**
     * search by id
     * @param id
     * @return
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponseRest> searchProduct(@PathVariable Long id) {
        ResponseEntity<ProductResponseRest> response = service.searchById(id);
        return response;
    }

    @GetMapping("/products/filter/{name}")
    public ResponseEntity<ProductResponseRest> searchByName(@PathVariable String name) {
        ResponseEntity<ProductResponseRest> response = service.searchByName(name);
        return response;
    }


    @DeleteMapping("/products/{id}")
    public ResponseEntity<ProductResponseRest> deleteCategories(@PathVariable Long id) {
        ResponseEntity<ProductResponseRest> response = service.deletebyId(id);
        return response;
    }

    @GetMapping("/products")
    public ResponseEntity<ProductResponseRest> findAll(){
        ResponseEntity<ProductResponseRest> response = service.findAll();
        return response;
    }



}
