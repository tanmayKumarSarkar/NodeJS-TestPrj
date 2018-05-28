import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { SessionCheckService } from '../services/session-check.service';
import { JwtHelper } from 'angular2-jwt';
import * as $ from 'jquery/dist/jquery.min.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: { id: String, name: String,username: String,email: String};;
  isEditable: boolean;
  userS: { name: String,username: String,email: String};

  constructor(private vs : ValidateService,
     private fm: FlashMessagesService, 
     private as: AuthService, 
     private rt: Router,
     private sc: SessionCheckService,
     private jwtHelper: JwtHelper) { }

  ngOnInit() {
    this.getProfile();
    this.isEditable = false;
    // let tokenObs = this.sc.validate(this.as.getToken()).subscribe((res) => {
    //     console.log(res);
    //     if(!res){
    //       console.log("session expired");
    //     }
    // });
    
  }

  editProfile(){
    this.userS = {name: this.user.name, username:this.user.username, email:this.user.email};
    this.isEditable = true;
  }

  updateProfile(id){
    this.as.updateProfile(id, this.userS).subscribe(profile =>{
      this.user = profile;
      
      this.as.updateUser(this.user);
      //console.log('As: ', this.as.user, 'profile comp : ',this.user);
      this.isEditable = false;    
      this.getProfile();

    },err=>{
      //console.log(err);
      return false;
    });
    //this.as.user = this.user;
    
  }

  getProfile(){
    this.as.getProfile().subscribe(profile =>{
      if(profile.success){
        this.user = profile.user;
        this.as.user = this.user;
      }else{
        //localStorage.clear();
      }
      
    },err=>{
      //console.log(err);
      localStorage.clear();
      return false;
    });
  }

  
}
