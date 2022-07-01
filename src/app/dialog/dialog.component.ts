import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  freshnessList = ["Brand New", "Second Hand", "Refurbished"];
  actionBtn: string = "Save";
  productForm !: FormGroup;
  constructor(private formBuilder : FormBuilder, 
    private service: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogComponent>
    ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName : ['', Validators.required],
      category : ['', Validators.required],
      freshness : ['', Validators.required],
      price : ['', Validators.required],
      comment : ['', Validators.required],
      date : ['', Validators.required],
    });

    if(this.editData){
      this.actionBtn = "Update";
      this.productForm.controls['productName'].setValue(this.editData.productName);
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct(){
    if(!this.editData){
      if(this.productForm.valid){
        this.service.postProduct(this.productForm.value).subscribe((res)=>{
          alert("Product Added Successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        })
      }else{
          alert("Error in Product Addition");
      }
    } else{
      this.updateProduct();
    }
 
  }

  updateProduct(){
    if(this.productForm.valid){
      this.service.putProduct(this.productForm.value, this.editData.id).subscribe((res)=>{
        alert("Product Update Successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      })
    }else{
      alert("There is Some Error in Updation");
    }
  }

}
