package com.company.inventory.dao;

import com.company.inventory.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface ICategoryDao extends CrudRepository<Category, Long> {



}
