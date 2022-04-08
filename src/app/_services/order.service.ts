import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  
  constructor(private http: HttpClient) { }

  getCustomerOrders(filter='',sortBy='created_at',sortDirection=-1){
    return this.http.get(`${environment.apiUrl}/orders/?${this.requestBuilder(filter,sortBy,sortDirection)}`);
  }

  private requestBuilder(filter:string,sortBy:string, sortDirection:number){
    let str = '';
    if(filter!==''){
      str+=`filter=${filter}`;
    }
    if(str!==''){
      str+='&';
    }
    str+=`sortBy=${sortBy}&sortDirection=${sortDirection}`;
    return str;
  }


}
