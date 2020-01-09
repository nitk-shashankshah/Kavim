import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	//private subscriber: any;
  products: any = [];
  categories: any = [];
  category:string = "All";
  fv = 3000;
  order = 1;
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
  ngOnInit() {
    
    this.cartService.hideMenu();
    //this.subscriber = this.route.params.subscribe(params => {
      this.http.get('http://kavim.co.in/api/v1/products?page=1').subscribe((data:any) => {
        this.products = data;   
      });
      this.http.get('http://kavim.co.in/api/v1/products/categories').subscribe((data:any) => {
        this.categories = data;
        this.categories.unshift("All");
      });
    //});
  }
}
