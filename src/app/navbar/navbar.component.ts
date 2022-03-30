import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed=true;
  modalOptions:NgbModalOptions;

  constructor(
    private modalService: NgbModal
  ){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  ngOnInit(): void {
      
  }
  open() {
    this.isNavbarCollapsed = true;
    this.modalService.open(CartOverviewComponent);
  }
}
