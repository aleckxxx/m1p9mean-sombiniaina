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
    OrdermodalComponent
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
