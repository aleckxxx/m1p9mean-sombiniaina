import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPage:number = 1;
  @Input() page:number = 1;
  
  constructor() { }

  counter(i: number){
    return new Array(i);
  }
  ngOnInit(): void {
  }

}
