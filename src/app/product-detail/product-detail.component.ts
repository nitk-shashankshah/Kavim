import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { CartServiceService } from '../cart-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  private sub: any;
  constructor(private location: Location, private cartService:CartServiceService) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }
  addToCart(){

  }
  removeItem(){
    
  }
  closeBox(){
    this.location.back();
  }
}
