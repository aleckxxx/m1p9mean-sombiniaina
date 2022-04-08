import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  isCollapsed = true;
  @Input() order:any = {};
  constructor() { }
  
  ngOnInit(): void {
  }
  
  getSubtotal(price:number,quantity:number){
      return price*quantity;
  }
}
