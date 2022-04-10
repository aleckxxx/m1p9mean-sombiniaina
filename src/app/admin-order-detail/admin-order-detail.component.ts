import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminOrderViewerComponent } from '../admin-order-viewer/admin-order-viewer.component';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.css']
})
export class AdminOrderDetailComponent implements OnInit {
  loading = true;
  order: any = {};
  orderMin: any = {};
  modalParent: AdminOrderViewerComponent | undefined;
  deliveryId = '';
  deliveries: any[] = [];
  index = -1;
  errors: any = {};
  constructor(public activeModal: NgbActiveModal,private orderService: OrderService ) { }

  ngOnInit(): void {
  }
  assign(){
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.modalParent?.preparedOrders.splice(this.index,1);
        this.modalParent?.onTheWayOrders.push(this.orderMin);
      }
      else{
        if(data["data"]["errors"] !== undefined){
          this.errors = data["data"]["errors"];
        }
      }
      this.activeModal.close();
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.orderService.assignOrder(this.order._id,this.deliveryId).subscribe(okay,notokay);
  }

  public initOrder(order: any,index: number){
    this.index = index;
    this.orderMin = order;
    let okay = (data:any)=>{
      if(data["status"]==200){
        console.log(data);
        this.loading = false;
        if(data["data"]["deliveries"]){
          this.order = data["data"]["order"];
          this.deliveries = data["data"]["deliveries"];
        }
        else{
          this.order = data["data"];
        }
      }
      else{
        console.log(data["message"]);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.orderService.getOrder(order._id).subscribe(okay,notokay);
  }

  getSubtotal(one:number,two:number){
    return one * two;
  }
}
