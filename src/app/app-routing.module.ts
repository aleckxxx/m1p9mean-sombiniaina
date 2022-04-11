import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountvalidationComponent } from './accountvalidation/accountvalidation.component';
import { AdminOrderViewerComponent } from './admin-order-viewer/admin-order-viewer.component';
import { DeliveryOrderListComponent } from './delivery-order-list/delivery-order-list.component';
import { DetailcategoryComponent } from './detailcategory/detailcategory.component';
import { DishcategorycreateComponent } from './dishcategorycreate/dishcategorycreate.component';
import { DishcategorylistComponent } from './dishcategorylist/dishcategorylist.component';
import { DishcategoryupdateComponent } from './dishcategoryupdate/dishcategoryupdate.component';
import { DishcreateComponent } from './dishcreate/dishcreate.component';
import { DishupdateComponent } from './dishupdate/dishupdate.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { OrderListComponent } from './order-list/order-list.component';
import { RestaurantAdminListComponent } from './restaurant-admin-list/restaurant-admin-list.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';
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
      },
      {
        path: 'orders',
        component: OrderListComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Customer] }
      }
    ]
  },
  {
    path:'delivery',
    children:[
      {
        path: '',
        component: DeliveryOrderListComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.DeliveryGuy] }
      }
    ]
  },
  {
    path:'restaurantmanager',
    children:[
      {
        path: '',
        component: RestaurantOrdersComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Restaurant] }
      },
      {
        path:'dishes',
        children:[
          {
            path:'new',
            component: DishcreateComponent,
            canActivate: [AuthGuard],
            data:{roles: [Role.Restaurant] }
          },
          {
            path:'update/:id',
            component: DishupdateComponent,
            canActivate: [AuthGuard],
            data:{roles: [Role.Restaurant] }
          }
        ]
      },
      {
        path: 'dishcategories',
        children:[
          {
            path:'',
            component: DishcategorylistComponent,
            canActivate: [AuthGuard],
            data:{roles: [Role.Restaurant] }
          },
          {
            path:'dishList/:id',
            component: DetailcategoryComponent,
            canActivate: [AuthGuard],
            data:{roles: [Role.Restaurant] }
          },
          {
            path:'new',
            component: DishcategorycreateComponent,
            canActivate: [AuthGuard],
            data:{roles: [Role.Restaurant] }
          },
          {
            path:'update/:id',
            component: DishcategoryupdateComponent,
            canActivate: [AuthGuard],
            data:{roles: [Role.Restaurant] }
          }
        ]
      }
    ]
  },
  {
    path: 'admin',
    children:[
      {
        path: '',
        component: AdminOrderViewerComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Admin] }
      },
      {
        path: 'restaurants',
        component: RestaurantAdminListComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Admin] }
      },
      {
        path: 'restaurants/new',
        component: RestaurantCreateComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Admin] }
      },
      {
        path: 'restaurants/update/:id',
        component: RestaurantUpdateComponent,
        canActivate: [AuthGuard],
        data:{roles: [Role.Admin] }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
