import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DishcategoryService } from '../_services/dishcategory.service';

@Component({
  selector: 'app-detailcategory',
  templateUrl: './detailcategory.component.html',
  styleUrls: ['./detailcategory.component.css']
})
export class DetailcategoryComponent implements OnInit {
  category: any = {};
  id = '';
  constructor(private router: Router, private snapshot: ActivatedRoute, private dishCategoryService: DishcategoryService) { }

  ngOnInit(): void {
    let tempo =  this.snapshot.snapshot.paramMap.get("id");
    if(tempo){
      let okay = (data:any)=>{
        if(data["status"]==200){
          this.category = data["data"];
        }
        else{
          console.log(data);
        }
      }
      let notokay = (err:any)=>{
          console.log(err);
      }
      this.dishCategoryService.getByIdDetailed(this.id).subscribe(okay,notokay);
    }
  }
  delete(id: string, index: number){
    
  }
  redirectUpdate(id:string){
    this.router.navigateByUrl(`/restaurantmanager/dishes/${id}`);
  }
  createNew(){
    this.router.navigateByUrl('/restaurantmanager/dishes/new');
  }
}
