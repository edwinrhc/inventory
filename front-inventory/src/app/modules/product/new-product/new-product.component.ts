import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CategoryService} from "../../shared/services/category.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../shared/services/product.service";
import {CategoryElement} from "../../category/components/category/category.component";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  public productForm!: FormGroup;


  estadoFormulario: string = "Agregar";
  categories: CategoryElement[] = [];

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productoService = inject(ProductService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);


  ngOnInit(): void {

    this.estadoFormulario="Agregar";

      this.productForm = this.fb.group({
        name:['', Validators.required],
        price:['', Validators.required],
        account:['', Validators.required],
        category:['', Validators.required],
        picture:['', Validators.required],
      })

    this.getCategories();
  }

  onSave(){

  }

  onCancel(){
    this.dialogRef.close(3);
  }


  getCategories(){
    this.categoryService.getCategories()
      .subscribe( (data:any) => {
        this.categories = data.categoryResponse.category;
      }, (error: any)=> {
        console.log("error al consultar categorias")
    })
  }


}
