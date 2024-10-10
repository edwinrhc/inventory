package com.company.inventory.controller;

import com.company.inventory.model.Category;
import com.company.inventory.response.CategoryResponseRest;
import com.company.inventory.service.ICategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api/v1")
public class CategoryRestController {

    @Autowired
    private ICategoryService service;

    /**
     * get all the categories
     *
     * @return
     */
    @GetMapping("/categories")
    public ResponseEntity<CategoryResponseRest> searchCategories() {

        ResponseEntity<CategoryResponseRest> response = service.search();
        return response;

    }

    /**
     * get categories by id
     *
     * @param id
     * @return
     */
    @GetMapping("/categories/{id}")
    public ResponseEntity<CategoryResponseRest> searchCategoriesPorID(@PathVariable Long id) {
        ResponseEntity<CategoryResponseRest> response = service.searchById(id);
        return response;
    }

    /**
     * get categories by name
     *
     * @param name
     * @return
     */
//    @GetMapping("/categories/name/{name}")
//    public ResponseEntity<CategoryResponseRest> searchCategoriesPorName(@PathVariable String name) {
//        ResponseEntity<CategoryResponseRest> response = service.searchByName(name);
//        return response;
//    }
    @GetMapping("/categories/name/{name}")
    public ResponseEntity<CategoryResponseRest> findByName(@PathVariable String name) {
        ResponseEntity<CategoryResponseRest> response = service.getCategoryByName(name);
        return response;
    }


    /**
     * save categories
     *
     * @param Category
     * @return
     */
    @PostMapping("/categories")
    public ResponseEntity<CategoryResponseRest> savedCategories(@RequestBody Category category) {
        ResponseEntity<CategoryResponseRest> response = service.save(category);
        return response;
    }

    /**
     * update categories
     *
     * @param category
     * @param id
     * @return
     */
    @PutMapping("/categories/{id}")
    public ResponseEntity<CategoryResponseRest> updateCategories(@RequestBody Category category, @PathVariable Long id) {
        ResponseEntity<CategoryResponseRest> response = service.update(category, id);
        return response;
    }

    /**
     * delete categories by id
     *
     * @param id
     * @return
     */
    @DeleteMapping("/categories/{id}")
    public ResponseEntity<CategoryResponseRest> deleteCategories(@PathVariable Long id) {
        ResponseEntity<CategoryResponseRest> response = service.deleteById(id);
        return response;
    }

}
