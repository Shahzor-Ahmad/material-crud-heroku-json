import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = ['Sr_No', 'productName', 'category', 'date', 'freshness', 'price', 'comment', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  title = 'angular-material-crud';

  constructor(public dialog : MatDialog, private service: ApiService) {

  }
  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(val =>{
      if(val === 'save'){
        this.getAllProduct();
      }
    })
  }

  getAllProduct(){
    this.service.getProduct().subscribe((res)=>{
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if(val === 'update'){
        this.getAllProduct();
      }
    })
  }

  deleteProduct(id : number){
    this.service.deleteProduct(id).subscribe((res)=>{
      alert("Product Delete Successfully");
      this.getAllProduct();
    })
  }

}
