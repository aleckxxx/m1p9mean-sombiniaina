import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPage:number = 1;
  @Input() page:number = 1;
  @Output() sendPage: EventEmitter<number> = new EventEmitter();
  constructor() { }

  counter(i: number){
    return new Array(i);
  }
  ngOnInit(): void {
  }

  sendPageNumber(i:number){
    this.sendPage.emit(i+1);
  }
}
