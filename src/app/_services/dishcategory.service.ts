import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DishcategoryService {

  constructor(private http: HttpClient) { }

  create(body: any){
    return this.http.post(`${environment.apiUrl}/dishcategories/`,body);
  }
  getAll(){
     return this.http.get(`${environment.apiUrl}/dishcategories/`);
  }
  getById(id:string){
    return this.http.get(`${environment.apiUrl}/dishcategories/${id}`);
  }
  
  update(objectId: string,body: any){
    return this.http.put(`${environment.apiUrl}/dishcategories/${objectId}`,body);
  }

  delete(objectId: string){
    return this.http.delete(`${environment.apiUrl}/dishcategories/${objectId}`);
  }
}
