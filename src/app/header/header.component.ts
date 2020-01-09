import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../assets/styles.css']
})
export class HeaderComponent implements OnInit {

  responsive:boolean=false;
  subscription: Subscription;
  menuSubscription: Subscription;

  cartItems:any=0;
  constructor(private cartService:CartServiceService) { 
    this.subscription = this.cartService.cartItemsService$.subscribe(
      (data:any) => {
        this.cartItems = data;
      }
    );
    this.menuSubscription = this.cartService.showMenu$.subscribe(
      (data:any) => {
        this.responsive = data;
      }
    );
  }

  ngOnInit() {

    /*
    const observable = new Observable(observer => {
      while (1) {
      var value = Math.random();
      if (value <= 1/3.0)
          observer.next(value);
      else if (value <= 2/3.0)
          observer.error("Value <= 2/3 (error)");
      else
          throw "Value > 2/3 (throw)"
      }
      observer.complete();
    });
    // Usage
    observable.subscribe({
      next(value) { console.log("Got value: " + value) },
      error(err) { console.log("Caught error: " + err) },
      complete() { console.log("Completed"); }
    });
    */

   const promise = new Promise(executorFunc);
   function executorFunc(resolve, reject) {
       const value = Math.random();
       if (value <= 1/3.0)
           resolve(value);
       else if (value <= 2/3.0)
           reject("Value <= 2/3 (reject)");
       else
           throw "Value > 2/3 (throw)"
   }
   // Usage
   promise.then(onFulfilled).catch(onRejected);
   function onFulfilled(value) {
       console.log("Got value: " + value);
   }
   function onRejected(error) {
       console.log("Caught error: " + error);
   }

  }

  myFunction() {
    if (!this.responsive)
      this.cartService.displayMenu();
    else
      this.cartService.hideMenu();
  }
}
