import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { restaurantOrder } from '../_models/restaurantOrder';
import { CartService } from '../_services/cart-service.service';
import { CheckoutService } from '../_services/checkout.service';

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
  errors: any= {};
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal, private cartService: CartService, private checkoutService: CheckoutService ) {}

  ngOnInit() {
    this.restaurantOrders = this.cartService.restaurantItems;
    this.total = this.cartService.total;
    this.deliveryFee = this.cartService.deliveryFee;
  }

  checkout(){
      let okay = (data:any)=> {
        if(data["status"]==200){
          this.activeModal.close();
        }
        else{
          if(data["data"]["errors"]){
            this.errors = data["data"]["errors"];
          }
          console.log(data);
        }
      }
      this.checkoutService.checkout({adress: this.adress, restaurantItems: this.restaurantOrders}).subscribe(okay);
      
  }

  getDeliveryFee(){
    return this.cartService.deliveryFee;
  }

}
