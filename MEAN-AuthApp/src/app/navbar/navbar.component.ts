import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private vs : ValidateService, private fm: FlashMessagesService, private as: AuthService, private rt: Router) { }
  x=true;
  ngOnInit() {
  }

  onLogoutClick(){
    this.as.logout();
    this.fm.show("Logged Out", {cssClass:'alert-success', timeout:3000});
    this.rt.navigate(['/login']);
    return false;
  }

}
