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
  selectedFile: any;
  nameImg: string ="";

  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
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
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account:this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name',data.name);
    uploadImageData.append('price',data.price);
    uploadImageData.append('account',data.account);
    uploadImageData.append('categoryId',data.category);

    // call the service to save a product
    this.productService.saveProduct(uploadImageData)
        .subscribe( (data:any) =>
        {
          this.dialogRef.close(1);
        },
          (error:any) => {
            this.dialogRef.close(2);
          });
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

  onFileChanged(event:any){

    this.selectedFile = event.target.files[0]; // Aceder al archivo
    console.log(this.selectedFile);

    this.nameImg = event.target.files[0].name; // Recupero el nombre


  }


}
