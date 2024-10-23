package com.company.inventory.dao;

import com.company.inventory.model.Product;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IProductDao extends CrudRepository<Product, Long> {


    @Query("SELECT p FROM Product p WHERE p.name LIKE :prefix%")
    List<Product> findByName(@Param("prefix")String prefix);

}
