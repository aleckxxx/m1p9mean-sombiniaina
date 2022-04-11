import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../_models/Role';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {email:'', password: ''};
  error: string | undefined;
  constructor(private route: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.route.navigate(['/']);
    }
  }
  login(form: NgForm){
    if(form.valid){
      let okay = (data:any)=>{
        if(data["status"]==200){
          this.navigateAccordingToRole();
        }
        else{
          this.error = data["message"]; 
          console.log(this.error);
        }
      }
      let notokay = (err:any)=>{
          console.log(err);
      }
      this.authService.login(this.user.email,this.user.password).subscribe(okay,notokay);
    }
  }
  navigateAccordingToRole(){
    let role = this.authService.getRole();
    if(Role.Admin){
      this.route.navigateByUrl("/admin");
    }
    else if(Role.Restaurant){
      this.route.navigateByUrl("/restaurantmanager");
    }
    else if(Role.DeliveryGuy){
      this.route.navigateByUrl("/delivery");
    }
    else{
      this.route.navigateByUrl("/");
    }
  }
}
