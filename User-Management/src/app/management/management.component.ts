import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  user: { id: String, name: String,username: String,email: String};

  constructor(private as: AuthService, private rt: Router) { }

  ngOnInit() {
    if(this.as.isNewlyLoaded){
    this.rt.navigate(['/profile']);
    }
    this.user = this.as.user;
  }

}
