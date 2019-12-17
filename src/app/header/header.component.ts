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
  cartItems:any=0;
  constructor(private cartService:CartServiceService) { 
    this.subscription = this.cartService.cartItemsService$.subscribe(
      (data:any) => {
        this.cartItems = data;
      }
    );
  }

  ngOnInit() {
  }

  myFunction() {
    this.responsive = !this.responsive ;
  }
}
