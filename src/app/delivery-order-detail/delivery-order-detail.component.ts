import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './delivery-order-detail.component.html',
  styleUrls: ['./delivery-order-detail.component.css']
})
export class DeliveryOrderDetailComponent implements OnInit {
  isCollapsed = true;
  @Input() order:any = {};
  @Input() index: number = -1;
  @Output() deliver: EventEmitter<number> = new EventEmitter<number>();
  constructor(private orderService: OrderService) { }
  
  ngOnInit(): void {
  }
  
  getSubtotal(price:number,quantity:number){
      return price*quantity;
  }

  finishOrder(){
    let okay = (data:any)=>{
      console.log(data);
      if(data["status"]===200){
        this.deliver.emit(this.index);
      }
      else{
        console.log(data["message"]);
      }
    }
    this.orderService.finishDelivery(this.order._id).subscribe(okay);
  }
}
