import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken : any;
  user: { id:String, name: String,username: String,email: String}
  api: String = 'http://localhost:3000' || '';

  constructor(private http: Http) {
    this.user= {id:'', name: '',username: '',email: ''};
   }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.api}/api/users`, user, {headers: headers})
      .map(res=> res.json());
  }

  authUser(user){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.post(`${this.api}/api/login`, user, {headers: headers})
      .map(res=> res.json());
  }

  loggedIn(){  
    return tokenNotExpired('id_token');
  }

  getProfile(){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.getToken());
    return this.http.post(`${this.api}/api/profile`,{}, {headers: headers})
      .map(res=> res.json());
  }

  updateProfile(id, user){
    let headers = new Headers({'Content-Type': 'application/json'});
    return this.http.put(`${this.api}/api/profile/${id}`,user, {headers: headers})
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

  getLuser(){
    return this.user = JSON.parse(localStorage.getItem('user'));
  }

  updateUser(user){
    this.user = user;
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
    this.getLuser();
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
