import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountvalidationComponent } from './accountvalidation/accountvalidation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupFormComponent } from './signup-form/signup-form.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'signin',
        component: LoginComponent
      },
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'signup',
        component: SignupFormComponent
      },
      {
        path: 'accountvalidation/:token',
        component: AccountvalidationComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
