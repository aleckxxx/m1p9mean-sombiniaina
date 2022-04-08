import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isThisTypeNode } from 'typescript';
import { RequestFormatterHelper } from '../_helpers/requestformatter.helper';
import { DishOrder } from '../_models/DishOrder';
import { restaurantOrder } from '../_models/restaurantOrder';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private processing = false;
  restaurantItems: restaurantOrder[] = [];
  assets: any = {restaurants: {}, dishes: {}};
  deliveryFee: number = 0;
  itemNumber = 0;
  total: number = 0;
  cartUpdate: Subject<DishOrder> = new Subject<DishOrder>();
  constructor(private http: HttpClient, private requestFormatter: RequestFormatterHelper) {

    this.http.get(`${environment.apiUrl}/parameters/deliveryFee`, requestFormatter.getHeader()).subscribe((reponse:any)=>{
      this.deliveryFee = reponse["data"];
      this.total+= this.deliveryFee;
    });
    let restaurants: any = {};
    let dishes: any = {};
    this.assets.restaurants = restaurants;
    this.assets.dishes = dishes;
   }
   reset(){
     this.restaurantItems = [];
     this.total = 0;
     this.assets = {restaurants: {}, dishes: {}};
   }
  addItemToCart(restaurantId: string,dishId: string, dishAsset: any){
    try{
      while(this.processing){}
      this.processing = true;
      let restaurantIndex = this.getRestaurantIndex(restaurantId);
      let dishIndex = this.getDishIndex(restaurantIndex,dishId,dishAsset);
      let quantityActual = this.restaurantItems[restaurantIndex].items[dishIndex].quantity;
      this.restaurantItems[restaurantIndex].items[dishIndex].quantity = quantityActual + 1;
      this.total += this.assets.dishes[dishId].dishInfo.price;
      this.itemNumber++;
      this.cartUpdate.next(this.restaurantItems[restaurantIndex].items[dishIndex]);
      this.processing = false;
    }
    catch(err){
      console.log(err);
      this.processing = false;
    }
  }

  substractItemFromCart(restaurantId: string, dishId: string, dishAsset: any){
    try{
      while(this.processing){}
      this.processing = true;
      let restaurantIndex = this.getRestaurantIndex(restaurantId);
      let dishIndex = this.getDishIndex(restaurantIndex,dishId,dishAsset);
      this.total -= this.assets.dishes[dishId].dishInfo.price;
      let quantity = this.redureOrRemoveDish(restaurantIndex,restaurantId,dishIndex, dishId);
      this.itemNumber--;
      if(quantity!=0)
        this.cartUpdate.next(this.restaurantItems[restaurantIndex].items[dishIndex]);
      this.processing = false;
    }
    catch(err){
      console.log(err);
      this.processing = false;
    }
  }
  
  private redureOrRemoveDish(restaurantIndex: number, restaurantId: string, dishIndex: number, dishId: string){
    let quantityActual = this.restaurantItems[restaurantIndex].items[dishIndex].quantity;
    this.restaurantItems[restaurantIndex].items[dishIndex].quantity = quantityActual - 1;
    let quantity = this.restaurantItems[restaurantIndex].items[dishIndex].quantity;
    if(quantity<=0){
      delete this.assets.dishes[dishId];
      this.restaurantItems[restaurantIndex].items.splice(dishIndex,1);
    }
    if(this.restaurantItems[restaurantIndex].items.length <= 0){
      delete this.assets.restaurants[restaurantId];
      this.restaurantItems.splice(restaurantIndex,1);
    }
    return quantity;
  }
  private getDishIndex(restaurantIndex: number ,dishId: string, dishAsset: any){
    let index = this.restaurantItems[restaurantIndex].items.length;
    if(this.assets.dishes[dishId]){
      return this.assets.dishes[dishId].index;
    }  
    this.assets.dishes[dishId] = {index: index, dishInfo: dishAsset};
    this.restaurantItems[restaurantIndex].items.push({dish: dishId, quantity: 0});
    return index;
  }

  private getRestaurantIndex(restaurantId: string): number{
    let index = this.restaurantItems.length;
    if(this.assets.restaurants[restaurantId]){
      return this.assets.restaurants[restaurantId].index; 
    }
    this.assets.restaurants[restaurantId] = {index: index};
    this.restaurantItems.push(new restaurantOrder(restaurantId));
    return index;
  }
}
