import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  authToken : any;
  user: any;
  api: String = 'http://localhost:3000' || '';

  constructor(private http: Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.api}/users/register`, user, {headers: headers})
      .map(res=> res.json());
  }

}
