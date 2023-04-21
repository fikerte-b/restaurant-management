import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  

  constructor(private httpClient: HttpClient) {}
  //login(user: { email: string; password: string })
  login(user: any) {
    return this.httpClient.post( environment.apiUrl + 'users/login', user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

 
}
