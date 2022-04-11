import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-create',
  templateUrl: './restaurant-create.component.html',
  styleUrls: ['./restaurant-create.component.css']
})
export class RestaurantCreateComponent implements OnInit {
  errors: any = {};
  categories: any[] = [];
  constructor(private router: Router,private restaurantService: RestaurantService) { }

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
    
  }
  insert(form: FormData){
    let okay = (data:any)=>{
      console.log(data);
      if(data["status"]==200){
        this.router.navigateByUrl(`/admin/restaurants`);
      }
      else{
        if(data["data"]["errors"]){
          this.errors = data["data"]["errors"];
        }
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.restaurantService.insert(form).subscribe(okay,notokay);
  }


}
