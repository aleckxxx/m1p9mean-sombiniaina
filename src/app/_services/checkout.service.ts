import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http: HttpClient) { }
  checkout(data: any){
    return this.http.post(`${environment.apiUrl}/orders/checkout`,data, );
  }
}
