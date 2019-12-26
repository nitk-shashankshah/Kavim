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
  fv = 3000;
  category = "All";
  order = 1;
  currentPage=0;
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
      if (this.fv>3000)
        this.fv=3000;
    }
  }
  loadNext(){
    this.currentPage+=10;
    this.http.get('http://kavim.co.in/api/v1/users?page='+this.currentPage+'&limit=10').subscribe((data:any) => {
      this.products = data;   
    });
  }
  loadPrevious(){    
    this.currentPage-=10;
    if (this.currentPage<0)
      this.currentPage=0;
    this.http.get('http://kavim.co.in/api/v1/users?page='+this.currentPage+'&limit=10').subscribe((data:any) => {
      this.products = data;   
    });
  }
  ngOnInit() {
    //this.subscriber = this.route.params.subscribe(params => {
      this.cartService.hideMenu();
      this.http.get('http://kavim.co.in/api/v1/users?page=0&limit=10').subscribe((data:any) => {
        this.products = data;   
      });
      this.http.get('http://kavim.co.in/api/v1/users/categories').subscribe((data:any) => {
        this.categories = data;
        this.categories.unshift({"category":"All"});           
      });
    //});
  }

}
