import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { OrderService } from '../_services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  filter = '';
  sortBy = 'created_at';
  sortDirection = -1;
  orders: any[] = [];
  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders();
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
    this.orderService.getCustomerOrders(this.filter,this.sortBy,this.sortDirection).subscribe(okay);
  }


}
