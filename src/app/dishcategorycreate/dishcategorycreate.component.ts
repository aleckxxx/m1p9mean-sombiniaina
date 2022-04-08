import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishcategoryService } from '../_services/dishcategory.service';

@Component({
  selector: 'app-dishcategorycreate',
  templateUrl: './dishcategorycreate.component.html',
  styleUrls: ['./dishcategorycreate.component.css']
})
export class DishcategorycreateComponent implements OnInit {
  errors: any = {};
  constructor(private router: Router,private dishCategoryService: DishcategoryService) { }

  ngOnInit(): void {
  }

  insert(value: any){
    let okay = (data:any)=>{
      console.log(data);
      if(data["status"]==200){
        this.router.navigateByUrl("/restaurantmanager/dishcategories");
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
    this.dishCategoryService.create(value).subscribe(okay,notokay);
  }
}
