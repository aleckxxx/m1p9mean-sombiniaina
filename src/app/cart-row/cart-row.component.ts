import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../_services/cart-service.service';

@Component({
  selector: 'app-cart-row',
  templateUrl: './cart-row.component.html',
  styleUrls: ['./cart-row.component.css']
})
export class CartRowComponent implements OnInit {
  @Input() dishAsset: any = {};
  @Input() dishCart: any = {};
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartUpdate.subscribe((change)=>{
      if(change.dish == this.dishCart.dish){
        this.dishCart = change;
      }
      console.log(this.cartService.restaurantItems);
    });
  }

  getSubTotal(){
    return this.dishAsset.dishInfo.price * this.dishCart.quantity;
  }

  add(){
    this.cartService.addItemToCart(this.dishAsset.dishInfo.restaurantId, this.dishAsset.dishInfo._id, this.dishAsset.dishInfo);
  }
  substract(){
    this.cartService.substractItemFromCart(this.dishAsset.dishInfo.restaurantId, this.dishAsset.dishInfo._id, this.dishAsset.dishInfo);
  }
}
