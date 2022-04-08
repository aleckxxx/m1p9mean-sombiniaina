import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DishcategoryService } from '../_services/dishcategory.service';

@Component({
  selector: 'app-dishcategorylist',
  templateUrl: './dishcategorylist.component.html',
  styleUrls: ['./dishcategorylist.component.css']
})
export class DishcategorylistComponent implements OnInit {
  categories: any[] = [];
  constructor(private router: Router, private dishCategoryService: DishcategoryService) { }

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

  delete(id: string, index: number){
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.categories.splice(index,1);
      }
      else{
        console.log(data);
      }
    }
    let notokay = (err:any)=>{
        console.log(err);
    }
    this.dishCategoryService.delete(id).subscribe(okay,notokay);
  }
  redirectUpdate(id:string){
    this.router.navigateByUrl(`/restaurantmanager/dishcategories/update/${id}`);
  }
  createNew(){
    this.router.navigateByUrl('/restaurantmanager/dishcategories/new');
  }
}
