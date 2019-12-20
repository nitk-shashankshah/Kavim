import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart:any=[];
  subTotal:number=0;
  subscription: Subscription;
  cartItems:any=0;  

  constructor(private cartService:CartServiceService) {
    this.cartService.getCart().map(x => this.cart.push(x));
    this.subTotal=this.cartService.refreshTotal();
    this.subscription = this.cartService.cartItemsService$.subscribe(
      (data:any) => {
        this.cartItems = data;
      }
    );
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
    this.cartService.updateCart();
    this.refreshTotal();
  }

  ngOnInit() {
    this.cartService.hideMenu();
  }

}
