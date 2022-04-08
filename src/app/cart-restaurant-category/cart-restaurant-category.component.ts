import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../_services/cart-service.service';

@Component({
  selector: 'app-cart-restaurant-category',
  templateUrl: './cart-restaurant-category.component.html',
  styleUrls: ['./cart-restaurant-category.component.css']
})
export class CartRestaurantCategoryComponent implements OnInit {
  @Input() order : any = {};
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  getAsset(orderId:string){
    return this.cartService.assets.dishes[orderId];
  }
}
