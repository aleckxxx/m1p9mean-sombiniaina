import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  loading = true;
  searchResult: any;

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
   this.search(); 
  }
  search(query:string=''){
    this.loading = true;
    let okay = (data:any)=>{
      this.loading = false;
      if(data["status"]==200){
        this.searchResult = data["data"];
      }
      else{
        console.log(data["message"]);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.restaurantService.search(query).subscribe(okay,notokay);
  }
  getStatut(businessDays: any):string{
    let date = new Date();
    let hour = date.getHours();
    let day = date.getDay();
    if(!businessDays[day].opening){
      return 'fermé';
    }
    else{
      if(hour <= businessDays[day].closing && hour >= businessDays[day].opening){
        return 'ouvert';
      }
      else{
        return 'fermé';
      }
    }
  }
}
