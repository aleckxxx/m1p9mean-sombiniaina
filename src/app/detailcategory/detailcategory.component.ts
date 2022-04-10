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
        console.log(data);
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
      this.dishCategoryService.getByIdDetailed(tempo).subscribe(okay,notokay);
    }
  }
  delete(id: string, index: number){
    
  }
  redirectUpdate(id:string){
    this.router.navigateByUrl(`/restaurantmanager/dishes/update/${id}`);
  }
  createNew(){
    this.router.navigateByUrl('/restaurantmanager/dishes/new');
  }
}
