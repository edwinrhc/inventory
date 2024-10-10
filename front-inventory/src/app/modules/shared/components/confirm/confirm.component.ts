import {Component, OnInit} from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent  implements  OnInit{

     private categoryService = inject(CategoryService);
     private dialogRef = inject(MatDialogRef);
     public data = inject(MAT_DIALOG_DATA);


    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

  onNoClick(){
      this.dialogRef.close(3);
  }

  delete(){
    if(this.data != null){
      this.categoryService.deleteCategorie(this.data.id)
        .subscribe((data:any)=>{
          this.dialogRef.close(1);
      }, (error: any) => {
          this.dialogRef.close(2);
        })
    }else {
      this.dialogRef.close(2);
    }
  }




}
