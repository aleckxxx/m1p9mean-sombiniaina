import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../_services/restaurant.service';

@Component({
  selector: 'app-restaurant-admin-list',
  templateUrl: './restaurant-admin-list.component.html',
  styleUrls: ['./restaurant-admin-list.component.css']
})
export class RestaurantAdminListComponent implements OnInit {
  loading = true;
  searchResult: any;
  page = 1;
  constructor(private router: Router, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
   this.search(); 
  }
  search(){
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
    this.restaurantService.search('',this.page).subscribe(okay,notokay);
  }
  createNew(){
    this.router.navigateByUrl('/admin/restaurants/new');
  }

  changePage(i:number){
    this.page = i;
    this.search();
  }

  redirectUpdate(id:string){
    this.router.navigateByUrl(`/admin/restaurants/update/${id}`);
  }
 
}
