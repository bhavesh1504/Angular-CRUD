import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  productQuality = ["New-Like","Very-Good","Good"];
  productForm!:FormGroup;
  actionBtn : string = 'Add';
  constructor(private fb : FormBuilder, private service : ApiService, private dialogRef : MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA)public editData :any) { }

  ngOnInit(): void {
    this.productForm =  this.fb.group({
      brandname : ['', Validators.required],
      modelname : ['', Validators.required],
      date : ['', Validators.required],
      condition : ['', Validators.required],
      price : ['', Validators.required],
      comments : ['', Validators.required],
    });
    if(this.editData){
      this.actionBtn = 'Update';
      this.productForm.controls['brandname'].setValue(this.editData.brandname);
      this.productForm.controls['modelname'].setValue(this.editData.modelname);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['condition'].setValue(this.editData.condition);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comments'].setValue(this.editData.comments);
    }
  }

  addProduct(){
    // console.log(this.productForm.value);
    if(!this.editData){
      if(this.productForm.valid){
        this.service.postProducts(this.productForm.value)
        .subscribe({
          next:(res) => {
            alert('Product Added SuccessFully.');
            this.productForm.reset();
            this.dialogRef.close();
          },
          error:() => {
              alert('Error While Adding Product Retry.');
            },
        });
      }
    }else{
      this.updateProduct();
    }

    
  }

  updateProduct(){
    this.service.editProducts(this.productForm.value, this.editData.id).subscribe(res => {
        alert('Product Updated SuccessFully');
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      (err) => {
        alert('Error While Updating Product'); 
      });
  }

}
