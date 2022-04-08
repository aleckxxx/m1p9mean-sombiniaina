import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  signup(user:any){
    return this.http.post(`${environment.apiUrl}/users/register`,user);
  }

  accountValidation(token: any){
    return this.http.post(`${environment.apiUrl}/users/accountvalidation/`,{token: token});
  }
}
