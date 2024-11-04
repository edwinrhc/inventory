package com.company.inventory.service;

import com.company.inventory.dao.ICategoryDao;
import com.company.inventory.dao.IProductDao;
import com.company.inventory.model.Category;
import com.company.inventory.model.Product;
import com.company.inventory.response.ProductResponseRest;
import com.company.inventory.response.ResponseRest;
import com.company.inventory.util.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements IProductService {


    @Autowired
    private ICategoryDao categoryDao;

    @Autowired
    private IProductDao productDao;

    @Override
    @Transactional
    public ResponseEntity<ProductResponseRest> save(Product product, Long categoryId) {

        ProductResponseRest response = new ProductResponseRest();
        List<Product> list = new ArrayList<>();
        try {
            // Search category to set in the product object
            Optional<Category> category = categoryDao.findById(categoryId);
            if (category.isPresent()) {
                 product.setCategory(category.get());
                System.out.println(category.get() + " - ID" );
            } else {
                response.setMetadata("Respuesta noK", "-1", "Categoría no encontrada -  no asociada al producto");
                return new ResponseEntity<ProductResponseRest>(response, HttpStatus.NOT_FOUND);
            }

            // save the product
            Product productSaved = productDao.save(product);
            if(productSaved != null){
                list.add(productSaved);
                response.getProductResponse().setProducts(list);
                response.setMetadata("Respuesta OK", "00", "Producto guardado");

            }else {
                response.setMetadata("Respuesta NOT OK", "-1", "Producto no guardado");
                return new ResponseEntity<ProductResponseRest>(response, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.getStackTrace();
            response.setMetadata("Respuesta NOT OK", "-1", "Error al grabar el Producto no guardado");
            return new ResponseEntity<ProductResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<ProductResponseRest>(response, HttpStatus.OK);
    }

    /**
     * @param id
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ProductResponseRest> searchById(Long id) {

        ProductResponseRest response = new ProductResponseRest();
        List<Product> list = new ArrayList<>();

        try {
            // Search product by ID
            Optional<Product> product = productDao.findById(id);
            if (product.isPresent()) {
                byte[] imageDescompressed = Util.decompressZLib(product.get().getPicture());
                product.get().setPicture(imageDescompressed);
                list.add(product.get());
                response.getProductResponse().setProducts(list);
                response.setMetadata("Respuesta OK","00", "Producto encontrado");
            } else {
                response.setMetadata("Respuesta noK", "-1", "Producto no encontrado");
                return new ResponseEntity<ProductResponseRest>(response, HttpStatus.NOT_FOUND);
            }

        } catch (Exception e) {
            e.getStackTrace();
            response.setMetadata("Respuesta NOT OK", "-1", "Error al grabar el Producto no guardado");
            return new ResponseEntity<ProductResponseRest>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<ProductResponseRest>(response, HttpStatus.OK);
    }
}
