import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignupService } from '../_services/signup.service';

@Component({
  selector: 'app-accountvalidation',
  templateUrl: './accountvalidation.component.html',
  styleUrls: ['./accountvalidation.component.css']
})
export class AccountvalidationComponent implements OnInit {
  okay = false;
  loading = true;
  constructor(private route: ActivatedRoute,private signupService: SignupService) { }

  ngOnInit(): void {
    let token = this.route.snapshot.paramMap.get("token");
    console.log(token);
    if(!token){
      this.loading = false;
      return;
    }
    let okay = (data:any)=>{
      if(data["status"]==200){
        this.okay = true;
      }
      else{
        this.okay = false;
      }
      this.loading = false;
    }
    let notokay = (err:any)=>{
        this.loading = false;
    }
    this.signupService.accountValidation(token).subscribe(okay,notokay);
  }

}
