import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { Subscription } from 'rxjs';

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
  }

  myFunction() {
    if (!this.responsive)
      this.cartService.displayMenu();
    else
      this.cartService.hideMenu();
  }
}
