import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { restaurantOrder } from '../_models/restaurantOrder';
import { CartService } from '../_services/cart-service.service';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit {
  restaurantOrders: restaurantOrder[] = [];
  total: number = 0;
  deliveryFee = 0;
  adress = '';
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal, private cartService: CartService) {}

  ngOnInit() {
    this.restaurantOrders = this.cartService.restaurantItems;
    this.total = this.cartService.total;
    this.deliveryFee = this.cartService.deliveryFee;
  }

  checkout(){
    
  }

  getDeliveryFee(){
    return this.cartService.deliveryFee;
  }

}
