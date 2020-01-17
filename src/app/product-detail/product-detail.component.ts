import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
//import { CartServiceService } from '../cart-service.service';
import { Location } from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  slideIndex:any = 1;
  productImages:any=[];
  counter:any=1;
  isLoading:boolean=false;

  private sub: any;
  constructor(private location: Location,  private route: ActivatedRoute, private http: HttpClient,   private spinner: NgxSpinnerService) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }
  
  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }
  
  showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {this.slideIndex = 1}    
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].setAttribute("style","display:none");  
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex-1].setAttribute("style","display:block");  
    dots[this.slideIndex-1].className += " active";
  }
  
  onImageLoad(){
    this.counter--;
    if (this.counter==0)
      this.spinner.hide();
  }

  ngOnInit() {    
    this.http.get('http://kavim.co.in/api/v1/products/images?id='+this.id).subscribe((data:any) => {
      this.productImages = data;
      this.counter = this.productImages.length;
    });
    this.spinner.show();
  }

  addToCart(){

  }
  removeItem(){
    
  }
  closeBox(){
    this.location.back();
  }
}
