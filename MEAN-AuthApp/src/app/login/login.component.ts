import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;

  constructor(private vs : ValidateService, private fm: FlashMessagesService, private as: AuthService, private rt: Router) { }

  ngOnInit() {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.as.authUser(user).subscribe(data=>{
      if(data.success){
        this.fm.show("Logged In", {cssClass:'alert-success', timeout:3000});
        this.as.storeUserData(data.token, data.user);
        this.rt.navigate(['/profile']);
      }else{
        this.fm.show(data.msg, {cssClass:'alert-danger', timeout:3000}); 
        this.rt.navigate(['/login']);
      }
    });
  }

}
