import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from './dialogbox/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular-CRUD';
  dataSource!: MatTableDataSource<any>;
  displayedColumns: any[] = ['brandname', 'modelname', 'date', 'condition', 'price', 'comments', 'actions'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(private dialog : MatDialog, private service : ApiService ){}
  ngOnInit(): void {
    this.getProducts();
  }

  openDialog() {
    let dialogRef=this.dialog.open(DialogComponent, {
      width: '30%'
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.getProducts()
    })
  }

  getProducts(){
    this.service.getProducts()
    .subscribe({
      next:(res:any) => {
        // console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator =  this.paginator;
        this.dataSource.sort =  this.sort;
        
      },
      error:() => {
        alert('Error While fetching Data.')
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  editProducts(row:any){
    let dialogRef=this.dialog.open(DialogComponent,{
      width : '30%',
      data : row
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.getProducts();
    })
  }

  deleteProduct(id:number){
    this.service.deleteProducts(id).subscribe(res => {
      alert('Product Deleted Successfully');
      this.getProducts();
    },
    (err) => {
      alert('Error While Deleting Product');
    });
  }
}

