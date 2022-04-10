import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './delivery-order-list.component.html',
  styleUrls: ['./delivery-order-list.component.css']
})
export class DeliveryOrderListComponent implements OnInit {

  orders: any[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
    interval(10000).subscribe(()=>{
      this.getOrders();
    })
  }

  getOrders(){
    let okay = (data:any)=>{
      console.log(data);
      if(data["status"]===200){
        this.orders = data["data"];
      }
      else{
        console.log(data["message"]);
      }
    }
    this.orderService.getOrders().subscribe(okay);
  }

  spliceOrder(index: number){
    this.orders.splice(index,1);
  }
}
