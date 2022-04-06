import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menudish',
  templateUrl: './menudish.component.html',
  styleUrls: ['./menudish.component.css']
})
export class MenudishComponent implements OnInit {
  @Input() dish:any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
