import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dishcategoryform',
  templateUrl: './dishcategoryform.component.html',
  styleUrls: ['./dishcategoryform.component.css']
})
export class DishcategoryformComponent implements OnInit {
  @Input() title = '';
  @Input() action = '';
  @Input() dishcategory = {name: ''};
  @Input() errors:any = {};
  @Output() sender = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onAction(form: NgForm){
    this.sender.emit(form.value);
  }

}
