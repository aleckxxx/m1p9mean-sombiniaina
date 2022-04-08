import { Injectable } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';



@Injectable({ providedIn: 'root' })
export class RequestFormatterHelper {
    constructor(
     private authenticationService: AuthenticationService
    ) { }
    getHeader(){
        let header = {
            headers:{
                'Authorization': 'Bearer ' + this.authenticationService.getToken()
            }
        }
        console.log(header);
        return header;
    }
}