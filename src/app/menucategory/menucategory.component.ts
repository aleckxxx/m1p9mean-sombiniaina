import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menucategory',
  templateUrl: './menucategory.component.html',
  styleUrls: ['./menucategory.component.css']
})
export class MenucategoryComponent implements OnInit {
  @Input() category:any = {};
  
  constructor() { }

  ngOnInit(): void {
  }

}
