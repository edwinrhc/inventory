package com.company.inventory.service;

import com.company.inventory.dao.ICategoryDao;
import com.company.inventory.model.Category;
import com.company.inventory.response.CategoryResponseRest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements ICategoryService{

    @Autowired
    private ICategoryDao iCategoryDao;

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CategoryResponseRest> search() {

        CategoryResponseRest responseRest = new CategoryResponseRest();
        try {
            List<Category> categoryList = (List<Category>) iCategoryDao.findAll(); //realizamos el casteo
            responseRest.getCategoryResponse().setCategory(categoryList);
            responseRest.setMetadata("Respuesta Ok","00","Respuesta Exitosa");
        }catch (Exception e){
            responseRest.setMetadata("Respuesta Error","-1","Error al consultar");
            e.getStackTrace();
            return new ResponseEntity<CategoryResponseRest>(responseRest,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<CategoryResponseRest>(responseRest, HttpStatus.OK);


    }

    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<CategoryResponseRest> searchById(Long id) {

        CategoryResponseRest responseRest = new CategoryResponseRest();
        List<Category> categoryList = new ArrayList<>();
        try {

            Optional<Category> category = iCategoryDao.findById(id);
            if(category.isPresent()){
                //Si encontro algo
                categoryList.add(category.get());
                responseRest.getCategoryResponse().setCategory(categoryList);
                responseRest.setMetadata("Respuesta Ok","00","Categoria encontrada");
            }else{
                responseRest.setMetadata("Respuesta Error","-1","Categoria no encontrada");
                return new ResponseEntity<CategoryResponseRest>(responseRest,HttpStatus.NOT_FOUND);
            }

        }catch (Exception e){
            responseRest.setMetadata("Respuesta Error","-1","Error al consultar por el ID");
            e.getStackTrace();
            return new ResponseEntity<CategoryResponseRest>(responseRest,HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<CategoryResponseRest>(responseRest, HttpStatus.OK);
    }
}
