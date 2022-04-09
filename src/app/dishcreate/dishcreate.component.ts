import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DishService } from '../_services/dish.service';
import { DishcategoryService } from '../_services/dishcategory.service';

@Component({
  selector: 'app-dishcreate',
  templateUrl: './dishcreate.component.html',
  styleUrls: ['./dishcreate.component.css']
})
export class DishcreateComponent implements OnInit {
  errors: any = {};
  categories: any[] = [];
  constructor(private router: Router,private dishService: DishService, private dishCategoryService: DishcategoryService) { }

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
    this.dishCategoryService.getAll().subscribe(okay,notokay);
  }
  insert(form: FormData){
    let okay = (data:any)=>{
      console.log(data);
      if(data["status"]==200){
        this.router.navigateByUrl(`/restaurantmanager/dishcategories/dishList/${data["data"]["categoryId"]}`);
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
    this.dishService.create(form).subscribe(okay,notokay);
  }

}
