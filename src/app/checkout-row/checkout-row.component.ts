import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../_services/cart-service.service';

@Component({
  selector: 'app-checkout-row',
  templateUrl: './checkout-row.component.html',
  styleUrls: ['./checkout-row.component.css']
})
export class CheckoutRowComponent implements OnInit {
  @Input() dishAsset: any = {};
  @Input() dishCart: any = {};
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  getSubTotal(){
    return this.dishAsset.dishInfo.price * this.dishCart.quantity;
  }
}
