import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './new-product/new-product.component';



@NgModule({
  declarations: [
    ProductComponent,
    NewProductComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
