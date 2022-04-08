import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-ordermodal',
  templateUrl: './ordermodal.component.html',
  styleUrls: ['./ordermodal.component.css']
})
export class OrdermodalComponent implements OnInit {
  public order: any = {};
  public orderNumber: string = '';
  charging: boolean = true;
  constructor(public activeModal: NgbActiveModal,private modalService: NgbModal, private orderService: OrderService) { }

  ngOnInit(): void {
  }
  public setOrder(orderId: string){
    let okay = (data:any)=>{
      console.log(data);
      if(data["status"]==200){
        this.order = data["data"];
      }
      else{
        console.log(data["message"]);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.orderService.getRestaurantOrder(orderId).subscribe(okay,notokay);
  }
}
