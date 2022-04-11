import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modalsignup',
  templateUrl: './modalsignup.component.html',
  styleUrls: ['./modalsignup.component.css']
})
export class ModalsignupComponent implements OnInit {

  constructor(private router: Router,public activeModal: NgbActiveModal,private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  close(){
    this.activeModal.close();
    this.router.navigateByUrl("/");
  }
}
