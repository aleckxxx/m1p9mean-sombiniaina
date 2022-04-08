import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../_services/cart-service.service';

@Component({
  selector: 'app-checkout-category',
  templateUrl: './checkout-category.component.html',
  styleUrls: ['./checkout-category.component.css']
})
export class CheckoutCategoryComponent implements OnInit {

  @Input() order : any = {};
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  getAsset(orderId:string){
    return this.cartService.assets.dishes[orderId];
  }

  
}
