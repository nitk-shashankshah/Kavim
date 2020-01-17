import { Component, OnInit, Input } from '@angular/core';
import { CartServiceService } from '../cart-service.service';
import { NgxSpinnerService } from "ngx-spinner";

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

  constructor(private cartService:CartServiceService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
  }

  onImageLoad() {
    this.spinner.hide();
  }
  addToCart(imgInput,description,price,id) {
    this.cartService.addItem(imgInput,description,price,id);
  }

}