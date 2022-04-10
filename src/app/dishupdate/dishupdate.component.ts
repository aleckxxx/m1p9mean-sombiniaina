import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishService } from '../_services/dish.service';

@Component({
  selector: 'app-dishupdate',
  templateUrl: './dishupdate.component.html',
  styleUrls: ['./dishupdate.component.css']
})
export class DishupdateComponent implements OnInit {
  dish: any = {};
  categories:any = [];
  errors: any = {};
  id = '';
  constructor(private router: Router, private snapshot: ActivatedRoute, private dishService: DishService) { }

  ngOnInit(): void {
    let tempo =  this.snapshot.snapshot.paramMap.get("id");
    if(tempo){
      this.id = tempo;
      let okay = (data:any)=>{
        console.log(data);
        if(data["status"]==200){
          this.dish = data["data"]["dish"];
          this.categories = data["data"]["categories"];
        }
        else{
            this.router.navigateByUrl("/restaurantmanager/dishcategories");
        }
      }
      let notokay = (err:any)=>{
          console.log(err);
      }
      this.dishService.getById(this.id).subscribe(okay,notokay);
    }
  }

  update(value: any){
    let okay = (data:any)=>{
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
    this.dishService.update(this.id,value).subscribe(okay,notokay);
  }
}
