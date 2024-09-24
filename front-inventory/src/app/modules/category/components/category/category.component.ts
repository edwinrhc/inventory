import {Component, inject, OnInit} from '@angular/core';
import {CategoryService} from "../../../shared/services/category.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {NewCategoryComponent} from "../new-category/new-category.component";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  //Aquí se inyecta el servicio en
  private categoryService = inject(CategoryService);
  public dialog  = inject(MatDialog);

  ngOnInit(): void {
       this.getCategories();
    }

  displayedColumns: string[] = ['id','name','description','actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  getCategories():void{
    this.categoryService.getCategories()
      .subscribe((data:any)=>{
      console.log("Respuesta categories: ", data);
      this.processCategoriesResponse(data);
    },(error:any) => {
      console.log("error: ", error);
    })
  }

  processCategoriesResponse(resp: any){
    const dataCategory: CategoryElement[] = [];
    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;
      listCategory.forEach((element:CategoryElement) => {
        dataCategory.push(element)
      });
      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
    }
  }


  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',

    });

    dialogRef.afterClosed().subscribe((result:any) => {
    });
  }

}



export interface CategoryElement {
  id: number;
  name: string;
  description: string;

}
