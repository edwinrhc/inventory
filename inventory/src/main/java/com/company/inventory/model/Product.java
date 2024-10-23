package com.company.inventory.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name="product")
public class Product implements Serializable {


    @Serial
    private static final long serialVersionUID = -4588091271856998941L;


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    private int price;

    private int account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Category category;

    // Base 64
    @Lob
    @Basic(fetch= FetchType.LAZY)
    @Column(name="picture")
    private byte[] picture;




}
