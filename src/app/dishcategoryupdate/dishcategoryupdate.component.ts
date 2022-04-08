import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishcategoryService } from '../_services/dishcategory.service';

@Component({
  selector: 'app-dishcategoryupdate',
  templateUrl: './dishcategoryupdate.component.html',
  styleUrls: ['./dishcategoryupdate.component.css']
})
export class DishcategoryupdateComponent implements OnInit {
  errors: any = {};
  id : string = '';
  dishcategory: any = {};

  constructor(private router: Router, private snapshot: ActivatedRoute, private dishCategoryService: DishcategoryService) { 

  }
  
  ngOnInit(): void {
    let tempo =  this.snapshot.snapshot.paramMap.get("id");
    if(tempo){
      this.id = tempo;
      let okay = (data:any)=>{
        if(data["status"]==200){
          this.dishcategory = data["data"];
        }
        else{
            this.router.navigateByUrl("/restaurantmanager/dishcategories");
        }
      }
      let notokay = (err:any)=>{
          console.log(err);
      }
      this.dishCategoryService.getById(this.id).subscribe(okay,notokay);
    }
  }
  update(value: any){
    let okay = (data:any)=>{
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
    this.dishCategoryService.update(this.id,value).subscribe(okay,notokay);
  }
}
