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

  user: Object;

  constructor(private vs : ValidateService, private fm: FlashMessagesService, private as: AuthService, private rt: Router) { }

  ngOnInit() {
    console.log("in");    
    this.as.getProfile().subscribe(profile =>{
      this.user = profile.user;
      console.log("profile : ",profile);
    },err=>{
      console.log(err);
      return false;
    })
  }

}
