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
  query='';
  page = 1;
  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {
   this.search(); 
  }
  search(query:string=''){
    this.loading = true;
    this.query = query;
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
    this.restaurantService.search(query,this.page).subscribe(okay,notokay);
  }
  changePage(i:number){
    this.page = i;
    this.search(this.query);
  }
}
