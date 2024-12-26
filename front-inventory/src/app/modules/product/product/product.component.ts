import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProductService} from "../../shared/services/product.service";
import {catchError, finalize, tap} from "rxjs";
import {NewCategoryComponent} from "../../category/components/new-category/new-category.component";
import {CategoryService} from "../../shared/services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";
import {NewProductComponent} from "../new-product/new-product.component";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //Aquí se inyecta el servicio en
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  private productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id', 'name', 'price', 'account', 'category', 'picture', 'actions'];
  dataSource = new MatTableDataSource<ProductElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getProducts() {
    this.productService.getProducts()
      .subscribe((data: any) => {
        console.log("respuesta de productos: ", data);
        this.processProductResponse(data);
      }, (error: any) => {
        console.log("error en productos: ", error);
      })
  }

  processProductResponse(resp: any) {
    const dateProduct: ProductElement[] = [];
    if (resp.metadata[0].code = "00") {
      let listCProduct = resp.productResponse.products;
      listCProduct.forEach((element: ProductElement) => {
        element.category = element.category.name;
        element.picture = 'data:image/jpg;base64,' + element.picture;
        dateProduct.push(element);
      });

      // set the  datasource
      this.dataSource = new MatTableDataSource<ProductElement>(dateProduct);
      this.dataSource.paginator = this.paginator;

    }
  }

  openProductDialog() {

    const dialogRef = this.dialog.open(NewProductComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Producto Agregado", "Exitosa");
        this.getProducts();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar Producto", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 2000
    });
  }
}



export interface ProductElement {
  id: number;
  name: string;
  price: number;
  account: number;
  category: any;
  picture: any;
}




