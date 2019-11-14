import { Component, OnInit } from '@angular/core';
//import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: string;
  private sub: any;
  show:boolean = false;
  subscription: Subscription;

  constructor(/*private route: ActivatedRoute,*/private cartService:CartServiceService) {
    this.subscription = this.cartService.showDetails$.subscribe(
      (data:boolean) => {
        this.show = data;
      }
    );
  }

  ngOnInit() {
    /*this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];      
   });*/
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
 
  closeBox(){
    this.show=false;
  }
}
