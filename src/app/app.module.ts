import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { CartOverviewComponent } from './cart-overview/cart-overview.component';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { AccountvalidationComponent } from './accountvalidation/accountvalidation.component';
import { PaginationComponent } from './pagination/pagination.component';
import { MenucategoryComponent } from './menucategory/menucategory.component';
import { MenudishComponent } from './menudish/menudish.component';
import { CartRowComponent } from './cart-row/cart-row.component';
import { CartRestaurantCategoryComponent } from './cart-restaurant-category/cart-restaurant-category.component';
import { CheckoutCategoryComponent } from './checkout-category/checkout-category.component';
import { CheckoutRowComponent } from './checkout-row/checkout-row.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/http.interceptor';
import { RestaurantOrdersComponent } from './restaurant-orders/restaurant-orders.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { OrdermodalComponent } from './ordermodal/ordermodal.component';
import { DishcategorylistComponent } from './dishcategorylist/dishcategorylist.component';
import { DishcategoryformComponent } from './dishcategoryform/dishcategoryform.component';
import { DishcategorycreateComponent } from './dishcategorycreate/dishcategorycreate.component';
import { DishcategoryupdateComponent } from './dishcategoryupdate/dishcategoryupdate.component';
import { DetailcategoryComponent } from './detailcategory/detailcategory.component';
import { DishformComponent } from './dishform/dishform.component';
import { DishcreateComponent } from './dishcreate/dishcreate.component';
import { DishupdateComponent } from './dishupdate/dishupdate.component';
import { AdminOrderViewerComponent } from './admin-order-viewer/admin-order-viewer.component';
import { AdminOrderDetailComponent } from './admin-order-detail/admin-order-detail.component';
import { AssignDeliveryComponent } from './assign-delivery/assign-delivery.component';
import { DeliveryOrderListComponent } from './delivery-order-list/delivery-order-list.component';
import { DeliveryOrderDetailComponent } from './delivery-order-detail/delivery-order-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';
import { RestaurantAdminListComponent } from './restaurant-admin-list/restaurant-admin-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupFormComponent,
    RestaurantListComponent,
    FooterComponent,
    MenuComponent,
    CartOverviewComponent,
    CheckoutFormComponent,
    OrderListComponent,
    OrderDetailComponent,
    LoginComponent,
    HomeComponent,
    AccountvalidationComponent,
    PaginationComponent,
    MenucategoryComponent,
    MenudishComponent,
    CartRowComponent,
    CartRestaurantCategoryComponent,
    CheckoutCategoryComponent,
    CheckoutRowComponent,
    RestaurantOrdersComponent,
    OrdermodalComponent,
    DishcategorylistComponent,
    DishcategoryformComponent,
    DishcategorycreateComponent,
    DishcategoryupdateComponent,
    DetailcategoryComponent,
    DishformComponent,
    DishcreateComponent,
    DishupdateComponent,
    AdminOrderViewerComponent,
    AdminOrderDetailComponent,
    AssignDeliveryComponent,
    DeliveryOrderListComponent,
    DeliveryOrderDetailComponent,
    RestaurantFormComponent,
    RestaurantCreateComponent,
    RestaurantUpdateComponent,
    RestaurantAdminListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule, 
    HttpClientModule,
    NgDragDropModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
