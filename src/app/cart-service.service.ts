import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  cart:any=[];
  private success = new BehaviorSubject<boolean>(false);
  private clicked = new BehaviorSubject<boolean>(false);
  private showDetails = new BehaviorSubject<boolean>(false);

  private cartItems = new BehaviorSubject<any>(0);

  successShowHide$ = this.success.asObservable();
  clickedService$ = this.clicked.asObservable();
  cartItemsService$ = this.cartItems.asObservable();
  showDetails$ = this.showDetails.asObservable();

  constructor() {
    this.emptyCart();
  }

  emptyCart() {
    this.cart=[];
  }

  getCart() {
    return this.cart;
  }

  removeItem(i) {
    this.cart.splice(i, 1);
    this.cartItems.next(this.cart.length);
  }

  refreshTotal() {
    var subTotal=0;
    this.cart.map(x => subTotal += x.qty*x.price);
    return subTotal;
  }

  addItem(imgInput,description,price,ind) {
    var obj={"name":description, "id": ind, "qty":1, "price": price, "img":imgInput};
    var flg=true;
    this.clicked.next(true);
    this.cart.forEach((item,index) => {
      if (item.id == ind) {
        flg=false;        
      }  
    });
    if (flg==true) {
      this.cart.push(obj);
      this.success.next(true);
      this.cartItems.next(this.cart.length);
    } else {
      this.success.next(false);
    }
  }

  viewDetails() {
    this.showDetails.next(true);
  }

  closeDetails() {
    this.showDetails.next(false);
  }
}