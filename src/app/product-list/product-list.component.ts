import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: any = [];
  categories:any = [];
  fv = 5000;
  category = "All";
  order = 1;
  currentPage=1;
  minRange = 0;
  orders: any = [
    {value: '1', viewValue: 'Ascending'},
    {value: '-1', viewValue: 'Descending'}
  ];
  constructor(private http: HttpClient, private cartService:CartServiceService) {
  }
  
  resetMinMax(){
    if (this.minRange > this.fv){
      this.fv = this.minRange+100;
      if (this.fv>5000)
        this.fv=5000;
    }
  }
  loadNext(){
    this.currentPage+=1;
    this.http.get('http://kavim.co.in/api/v1/products?page='+this.currentPage).subscribe((data:any) => {
      this.products = data;   
    });
  }
  loadPrevious(){    
    this.currentPage-=1;
    if (this.currentPage<1)
      this.currentPage=1;
    this.http.get('http://kavim.co.in/api/v1/products?page='+this.currentPage).subscribe((data:any) => {
      this.products = data;   
    });
  }
  ngOnInit() {
      this.cartService.hideMenu();
      this.http.get('http://kavim.co.in/api/v1/products?page=1').subscribe((data:any) => {
        this.products = data;   
      });
      this.http.get('http://kavim.co.in/api/v1/products/categories').subscribe((data:any) => {
        this.categories = data;
        this.categories.unshift("All");           
      });
  }  
}
