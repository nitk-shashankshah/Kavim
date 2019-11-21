//nvm install v6.8.0
//nvm use --delete-prefix v13.1.0
//npm start

import { Component } from '@angular/core';
import { CartServiceService } from './cart-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kavim Handicrafts';
  show = false;
  addSuccess = true;
  subscription: Subscription;
  clickSubs: Subscription;

  hideMsg() {
    this.show=false;
  }
  constructor(private cartService:CartServiceService) {
    //this.cartService.get.subscribe(value => console.log(value));
    this.subscription = this.cartService.successShowHide$.subscribe(
      (data:boolean) => {
        this.addSuccess = data;       
      }
    );

    this.clickSubs = this.cartService.clickedService$.subscribe(
      (data:boolean) => {
        if (data==true) {
          this.show = true;
          setTimeout(()=>{this.show=!this.show},1000);
          this.addSuccess = true;
        }
      }
    );
  }
}
