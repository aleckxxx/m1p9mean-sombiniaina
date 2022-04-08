import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { restaurantOrder } from '../_models/restaurantOrder';
import { CartService } from '../_services/cart-service.service';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {
  restaurantOrders: restaurantOrder[] = [];
  total: number = 0;
  deliveryFee = 0;
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartUpdate.subscribe((change)=>{
      console.log(this.cartService.restaurantItems);
      this.restaurantOrders = this.cartService.restaurantItems;
      this.total = this.cartService.total;
      this.deliveryFee = this.cartService.deliveryFee;
    });

    this.restaurantOrders = this.cartService.restaurantItems;
    this.total = this.cartService.total;
    this.deliveryFee = this.cartService.deliveryFee;
  }

  checkout(){
    this.activeModal.close();
    this.modalService.open(CheckoutFormComponent);
  }

  getDeliveryFee(){
    return this.cartService.deliveryFee;
  }
}
