import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { NgxSpinnerService } from "ngx-spinner";
import  *  as  data  from  '../products.json';
import  *  as  categories  from  '../categories.json';

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
  isLoading = true;
  order = 1;
  totalImages = 2;
  minRange = 0;
  orders: any = [
    {value: '1', viewValue: 'Ascending'},
    {value: '-1', viewValue: 'Descending'}
  ];
  constructor(private http: HttpClient, private cartService:CartServiceService,  private spinner: NgxSpinnerService) {
    this.isLoading = true;
  }

  onImageLoad() {
    this.isLoading = false;
    this.totalImages--;
    if (this.totalImages==0)
      this.spinner.hide();
  }

  resetMinMax(){
    if (this.minRange > this.fv){
      this.fv = this.minRange+100;
      if (this.fv>3000)
        this.fv=3000;
    }
  }
  ngOnInit() {
    this.isLoading = true;
    this.spinner.show();
    this.cartService.hideMenu();
    //this.subscriber = this.route.params.subscribe(params => {
    this.products = data["default"]["products"];   
    this.totalImages+= this.products.length;
    this.categories = data["default"]["categories"];     
    //});
  }
}
