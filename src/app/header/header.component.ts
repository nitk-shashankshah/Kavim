import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', '../../assets/styles.css']
})
export class HeaderComponent implements OnInit {

  responsive:boolean=false;

  cartItems:any=0;
  constructor(private cartService:CartServiceService) {   
  }

  ngOnInit() {
    this.cartService.cartItemsService$.subscribe(
      (data:any) => {
        this.cartItems = data;
      }
    );
    this.cartService.showMenu$.subscribe(
      (data:any) => {
        this.responsive = data;
      }
    );
  }

  myFunction() {
    if (!this.responsive)
      this.cartService.displayMenu();
    else
      this.cartService.hideMenu();
  }
}
