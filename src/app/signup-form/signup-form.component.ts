import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalsignupComponent } from '../modalsignup/modalsignup.component';
import { AuthenticationService } from '../_services/authentication.service';
import { SignupService } from '../_services/signup.service';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {
  errors: any = {};
  constructor(private router: Router,private signupService: SignupService, private authService: AuthenticationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.router.navigate(['/']);
    }
  }

  signup(form: NgForm){
    if(form.valid){
      let okay = (data:any)=>{
        if(data["status"]==200){
          this.modalService.open(ModalsignupComponent);
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
      this.signupService.signup(form.value).subscribe(okay,notokay);
    }
  }
}
