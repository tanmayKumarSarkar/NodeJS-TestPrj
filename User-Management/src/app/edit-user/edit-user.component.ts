import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../services/validate.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userid: String;
  validUser: Boolean = false;
  user;
  userUp;

  constructor(private route: ActivatedRoute, private fm: FlashMessagesService, private as: AuthService, private rt: Router, private vs: ValidateService) { }

  ngOnInit() {
    if(this.as.isNewlyLoaded || this.as.permission == undefined || this.as.permission == '' || (this.as.permission != 'admin' && this.as.permission != 'moderator')){
      this.rt.navigate(['/profile']);
    }
    this.userid = this.route.snapshot.paramMap.get('id');
    this.as.getUserDetailAPI(this.userid).subscribe(data=>{      
      if(data.success){
        this.fm.show(data.msg, {cssClass:'alert-success', timeout:1000});
        this.validUser = true;
        this.userUp = this.user = data.user;
      }else{
        this.fm.show(data.msg, {cssClass:'alert-danger', timeout:6000}); 
        this.validUser = false;
        this.rt.navigate(['/profile']);
      }
    });
  }

  updateProfile(id, input){
    switch (input) {
      case "name":
        confirm("name is the color of balance and growth.");
        break;
      case "permission":
        confirm("permission is the color of balance and growth.");
        break;
      case "active":
        confirm("active is the color of balance and growth.");
        break;  
      default:
        confirm("Sorry, that color is not in the system yet!");
  }
    console.log(this.userUp,input);
  }

}
