import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  constructor(private http: HttpClient) { }

  search(query:string='',page=1){
    return this.http.get(`${environment.apiUrl}/restaurants?page=${page}&query=${query}`);
  }

  getDetail(restaurantId: string){
    return this.http.get(`${environment.apiUrl}/restaurants/${restaurantId}`);
  }

  insert(body:any){
    return this.http.post(`${environment.apiUrl}/restaurants`,body);
  }

  update(id:string,body:any){
    return this.http.put(`${environment.apiUrl}/restaurants/${id}`,body);
  }

  getCuisineTypes(){
    return this.http.get(`${environment.apiUrl}/parameters/cuisine`);
  }

  getById(id:string){
    return this.http.get(`${environment.apiUrl}/restaurants/${id}?type=nodetail`);
  }
}
