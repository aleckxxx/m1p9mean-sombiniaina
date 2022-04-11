import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  @Input() title = '';
  @Input() action = '';
  @Input() restaurant = {name: '', cuisine: '', adress: ''};
  categories: any[] = [];
  @Input() errors:any = {};
  @Output() sender = new EventEmitter();
  file: File | undefined;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.categories = data["data"];
      }
      else{
        console.log(data);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.restaurantService.getCuisineTypes().subscribe(okay,notokay);
  }

  onAction(form: NgForm){
    let formData: FormData = new FormData();
    if(this.file){
      formData.append('picture',this.file);
    }
    for(let key of Object.keys(form.value)){
      if(form.value[key]){
        formData.append(key, form.value[key]);
      }
    }
    this.sender.emit(formData);
  }

  selectFile(event: any){
    this.file = event.target.files.item(0);
  }

}
