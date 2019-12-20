import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  cart:any=[];
  private success = new BehaviorSubject<boolean>(false);
  private clicked = new BehaviorSubject<boolean>(false);
  private showDetails = new BehaviorSubject<boolean>(false);  
  private showMenu = new BehaviorSubject<boolean>(false);

  private cartItems = new BehaviorSubject<any>(0);

  successShowHide$ = this.success.asObservable();
  clickedService$ = this.clicked.asObservable();
  cartItemsService$ = this.cartItems.asObservable();
  showDetails$ = this.showDetails.asObservable();
  showMenu$ = this.showMenu.asObservable();

  constructor(private http: HttpClient) {
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
    var len=0;
    this.cart.map(x => len += x.qty);
    this.cartItems.next(len);
  }

  updateCart(){
    var len=0;
    this.cart.map(x => len += x.qty);
    this.cartItems.next(len);
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
      //this.cartItems.next(this.cart.length);
      var len=0;
      this.cart.map(x => len += x.qty);
      this.cartItems.next(len);
    } else {
      this.success.next(false);
    }
  }

  viewDetails() {
    this.showDetails.next(true);
  }

  displayMenu() {
    this.showMenu.next(true);
  }
  
  hideMenu() {
    this.showMenu.next(false);
  }

  closeDetails() {
    this.showDetails.next(false);
  }
}
