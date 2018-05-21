import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: { id: String, name: String,username: String,email: String};;
  isEditable: boolean;
  userS: { name: String,username: String,email: String};

  constructor(private vs : ValidateService, private fm: FlashMessagesService, private as: AuthService, private rt: Router) { }

  ngOnInit() {
    this.getProfile();
    this.isEditable = false;
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
      this.user = profile.user;
      this.as.user = this.user;
    },err=>{
      //console.log(err);
      return false;
    });
  }
  
}
