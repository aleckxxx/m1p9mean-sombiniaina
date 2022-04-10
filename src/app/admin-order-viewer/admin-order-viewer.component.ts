import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { interval } from 'rxjs';
import { AdminOrderDetailComponent } from '../admin-order-detail/admin-order-detail.component';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-admin-order-viewer',
  templateUrl: './admin-order-viewer.component.html',
  styleUrls: ['./admin-order-viewer.component.css']
})
export class AdminOrderViewerComponent implements OnInit {
  pendingOrders: any[]  =   [];
  public preparedOrders: any[] =   [];
  public onTheWayOrders: any[] =   [];
  finishedOrders: any[] =   [];
  
  dropAllowed = (dragData: any)=>{
    return true;
  }
  constructor(private orderService: OrderService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getOrders();
    interval(5000).subscribe(()=>{
      this.getOrders();
    });
  }

  onItemDrop(e: any){
    this.openModal(e.dragData.order, e.dragData.index);
  }

  openModal(order: any, index: Number){
    let modalRef = this.modalService.open(AdminOrderDetailComponent);
    modalRef.componentInstance.modalParent = this;
    modalRef.componentInstance.initOrder(order,index);
  }

  getOrders(){
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.pendingOrders = data["data"]["pending"];
        this.onTheWayOrders = data["data"]["ontheway"];
        this.preparedOrders = data["data"]["prepared"];
        this.finishedOrders = data["data"]["finished"];
      }
      else{
        console.log(data["message"]);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.orderService.getOrders().subscribe(okay,notokay);
  }
}
