import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-update',
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.css']
})
export class RestaurantUpdateComponent implements OnInit {
  restaurant: any = {};
  categories:any = [];
  errors: any = {};
  id = '';
  
  constructor(private router: Router, private snapshot: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    let tempo =  this.snapshot.snapshot.paramMap.get("id");
    if(tempo){
      this.id = tempo;
      let okay = (data:any)=>{
        if(data["status"]==200){
          this.restaurant = data["data"];
        }
        else{
            this.router.navigateByUrl("/admin/restaurants");
        }
      }
      let notokay = (err:any)=>{
          console.log(err);
      }
      this.restaurantService.getById(this.id).subscribe(okay,notokay);
    }
  }

  update(value: any){
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.router.navigateByUrl("/admin/restaurants");
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
    this.restaurantService.update(this.id,value).subscribe(okay,notokay);
  }

}
