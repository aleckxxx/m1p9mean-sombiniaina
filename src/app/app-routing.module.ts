import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountvalidationComponent } from './accountvalidation/accountvalidation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/Role';

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
      },
      {
        path: 'restaurantoverview',
        component: RestaurantListComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Customer] }
      },
      {
        path: 'restaurantdetail/:id',
        component: MenuComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Customer] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
