import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import * as jwt from 'jsonwebtoken';

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

  authUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.api}/users/authenticate`, user, {headers: headers})
      .map(res=> res.json());
  }

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  getProfile(){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.getToken());
    return this.http.get(`${this.api}/users/profile`, {headers: headers})
      .map(res=> res.json());
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getToken(){
    return this.authToken = localStorage.getItem('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
