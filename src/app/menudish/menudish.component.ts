import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartService } from '../_services/cart-service.service';


@Component({
  selector: 'app-menudish',
  templateUrl: './menudish.component.html',
  styleUrls: ['./menudish.component.css']
})
export class MenudishComponent implements OnInit {

  @Input() dish:any = {};
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  order(){
    console.log(this.dish);
    this.cartService.addItemToCart(this.dish.restaurantId,this.dish._id, this.dish);
  }
}
