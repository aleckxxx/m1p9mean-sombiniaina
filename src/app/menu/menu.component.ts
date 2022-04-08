import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  restaurant: any = {};
  constructor(private route: ActivatedRoute,private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id");
    if(id){
      let okay = (data:any)=>{
        if(data["status"]==200){
          this.restaurant = data["data"];
        }
        else{
          console.log(data["message"]);
        }
      }
      let notokay = (err:any)=>{
          console.log(err);
      }
      this.restaurantService.getDetail(id).subscribe(okay,notokay);
    }
    
  }

}
