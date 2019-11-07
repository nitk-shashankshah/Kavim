import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart:any=[];
  subTotal:number=0;

  constructor(private cartService:CartServiceService) {
    this.cartService.getCart().map(x => this.cart.push(x));
    this.subTotal=this.cartService.refreshTotal();
  }

  emptyCart(){
    this.cartService.emptyCart();
  }

  removeItem(i){
    this.cartService.removeItem(i);
    this.cart=[];
    this.cartService.getCart().map(x => this.cart.push(x));
    this.refreshTotal();
  }

  refreshTotal(){
    this.subTotal=this.cartService.refreshTotal();
  }

  calculateTotal(ev){
    if (ev.target.value > 5)
      ev.target.value=5;      
    if (ev.target.value < 1)
      ev.target.value=1;
    this.refreshTotal();
  }

  ngOnInit() {}

}
