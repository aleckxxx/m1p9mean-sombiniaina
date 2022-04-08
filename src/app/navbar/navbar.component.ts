import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../_services/authentication.service';
import { Role } from '../_models/Role';
import { CartOverviewComponent } from '../cart-overview/cart-overview.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isNavbarCollapsed=true;
  modalOptions:NgbModalOptions;
  constructor(private authService: AuthenticationService ,private modalService: NgbModal, private router : Router){
    this.modalOptions = {
      backdrop:'static',
      backdropClass:'customBackdrop'
    }
  }
  ngOnInit(): void {
      
  }
  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
  open() {
    this.isNavbarCollapsed = true;
    this.modalService.open(CartOverviewComponent);
  }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl("/signin");
  }
}
