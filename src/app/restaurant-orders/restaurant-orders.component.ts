import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { OrdermodalComponent } from '../ordermodal/ordermodal.component';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-restaurant-orders',
  templateUrl: './restaurant-orders.component.html',
  styleUrls: ['./restaurant-orders.component.css']
})
export class RestaurantOrdersComponent implements OnInit {
  pendingOrders: any[] = [];
  finishedOrders : any[] = [];
  dropAllowed = (dragData: any)=>{
    return true;
  }
  constructor(private orderService: OrderService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getRestaurantDetail();
    interval(5000).subscribe((data)=>{
      this.getRestaurantDetail();
    });
  }
  onItemDrop(e: any){
    this.pendingOrders.splice(e.dragData.index,1);
    this.finishedOrders.push(e.dragData.order);
    let okay = (data:any)=>{
      if(data["status"]==200){
      }
      else{
        console.log(data["message"]);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.orderService.finishPreparationOrder(e.dragData.order._id).subscribe(okay,notokay);
  }
  openModal(orderId: string, orderNumber: string){
    let modalRef = this.modalService.open(OrdermodalComponent);
    modalRef.componentInstance.orderNumber = orderNumber;
    modalRef.componentInstance.setOrder(orderId);
  }
  getRestaurantDetail(){
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.pendingOrders = data["data"]["pending"];
        this.finishedOrders = data["data"]["finished"];
      }
      else{
        console.log(data["message"]);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.orderService.getRestaurantOrders().subscribe(okay,notokay);
  }
}
