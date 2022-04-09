import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dishform',
  templateUrl: './dishform.component.html',
  styleUrls: ['./dishform.component.css']
})
export class DishformComponent implements OnInit {
  @Input() title = '';
  @Input() action = '';
  @Input() dish = {name: '', categoryId: '', picture: '',price: 0, makingPrice: 0,description: 0,active: false};
  @Input() categories: any[] = [];
  @Input() errors:any = {};
  @Output() sender = new EventEmitter();
  file: File | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  onAction(form: NgForm){
    let formData: FormData = new FormData();
    if(this.file){
      formData.append('picture',this.file);
    }
    for(let key of Object.keys(form.value)){
      formData.append(key, form.value[key]);
    }
    this.sender.emit(formData);
  }

  selectFile(event: any){
    this.file = event.target.files.item(0);
  }
}
