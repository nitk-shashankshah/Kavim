import { Component, OnInit, Input } from '@angular/core';
import { CartServiceService } from '../cart-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
  @Input() imgInput: string;
  @Input() price: string;
  @Input() description: string;
  @Input() id: string;

  constructor(private cartService:CartServiceService) { }

  ngOnInit() {
  }
  
  addToCart(imgInput,description,price,id) {
    this.cartService.addItem(imgInput,description,price,id);
  }
  viewDetails(imgInput,description,price,id) {
    this.cartService.viewDetails(imgInput,description,price,id);
  }
}