import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from "../../../shared/services/category.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {NewCategoryComponent} from "../new-category/new-category.component";
import {MatSnackBar, MatSnackBarRef, SimpleSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //Aquí se inyecta el servicio en
  private categoryService = inject(CategoryService);
  public dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.getCategories();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe((data: any) => {
        console.log("Respuesta categories: ", data);
        this.processCategoriesResponse(data);
      }, (error: any) => {
        console.log("error: ", error);
      })
  }

  processCategoriesResponse(resp: any) {
    const dataCategory: CategoryElement[] = [];
    if (resp.metadata[0].code == "00") {
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element)
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }


  openCategoryDialog() {
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Agregada","Exitosa");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al guardar Categoria","Error");
      }

    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action,{
      duration: 2000
    });
  }

  edit(id: number, name: string, description: string) {

    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
     data: {id:id, name: name, description: description} // Hacemos referencia
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result == 1) {
        this.openSnackBar("Categoria Actualizada","Exitosa");
        this.getCategories();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al actualizar Categoria","Error");
      }

    });

  }


}


export interface CategoryElement {
  id: number;
  name: string;
  description: string;

}
