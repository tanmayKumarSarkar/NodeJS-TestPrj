import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { SessionCheckService } from './session-check.service';
declare var $: any;

@Injectable()
export class AuthService {

  authToken : any;
  user: { id:String, name: String,username: String,email: String}
  api: String = 'http://localhost:3000' || '';
  isValid: Boolean = false;

  constructor(private http: Http, private sc: SessionCheckService) {
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
    if(!tokenNotExpired('id_token')) localStorage.clear();
    return tokenNotExpired('id_token');
  }

  confirmRegistration(token){
    return this.http.get(`${this.api}/api/confirmation/${token}`)
      .map(res=> res.json());
  }

  resendRegistration(email){
    return this.http.get(`${this.api}/api/resendconfirmation/${email}`)
      .map(res=> res.json());
  }

  checkActivatedUser(username){
    return this.http.get(`${this.api}/api/checkactivateduser/${username}`)
      .map(res=> res.json());
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
    this.isValid = true;
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

  resetPassword(id){
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    headers.append('Authorization', this.getToken());
    return this.http.post(`${this.api}/api/reset`,id, {headers: headers})
      .map(res=> res.json());
  }

  confirmNewPwdToken(token){
    return this.http.get(`${this.api}/api/newpassword/${token}`)
      .map(res=> res.json());
  }

  setNewPassword(id, pwd){
    //console.log("id : ",id ,"password : ",pwd);
    let headers = new Headers();
    headers.append('Content-type', 'application/json');
    return this.http.put(`${this.api}/api/setnewpwd/${id}`,{password: pwd}, {headers: headers})
      .map(res=> res.json());
  }

  trackSession(){
    let tokenObs = this.sc.validate(this.getToken()).subscribe((res) => {
      console.log(res);
      if(!res){
        this.isValid = false;
        $("#myModal").modal('show');
        console.log("session expired");
      }
  });
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
    this.isValid = false;
  }

}
