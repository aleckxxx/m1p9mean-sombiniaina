import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';

@Component({
  selector: 'app-cart-overview',
  templateUrl: './cart-overview.component.html',
  styleUrls: ['./cart-overview.component.css']
})
export class CartOverviewComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal) {}

  ngOnInit() {
  }

  checkout(){
    this.activeModal.close();
    this.modalService.open(CheckoutFormComponent);
  }
}
