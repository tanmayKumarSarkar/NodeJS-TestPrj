import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  user: { id: String, name: String,username: String,email: String, permission: String};
  users;
  canEdit: boolean = false;
  canDelete: boolean = false;
  usersCount;
  listStart = 0;
  listEnd;
  listLimit;
  validInp = true;

  constructor(private as: AuthService, private rt: Router) { }

  ngOnInit() {
    if(this.as.isNewlyLoaded){
    this.rt.navigate(['/profile']);
    }
    this.user = this.as.user;
    this.users = this.loadUsers();
  }

  loadUsers(){
    this.as.getAllUsers().subscribe(result =>{
      if(result.success){
        this.users = result.users;//console.log(this.users);
        if(this.user.permission == 'admin'){
          this.canDelete = true;
          this.canEdit = true;
          this.usersCount = this.listEnd = this.listLimit = this.users.length;
        }if(this.user.permission == 'moderator'){
          this.canDelete = false;
          this.canEdit = true;
        }
        
      }else{
        //localStorage.clear();
      }
    },err=>{
      return false;
    });
  }

  applyFilter(){
    if((parseFloat(this.listLimit) == parseInt(this.listLimit)) && !isNaN(this.listLimit) && this.listLimit>0 && this.listLimit<=this.usersCount) {
      this.listStart = 0;
      this.listEnd = this.listStart + this.listLimit;
      this.validInp = true;
    }else{
      this.validInp = false;
    }
  }

  removeFilter(){
      this.listStart = 0;
      this.listEnd = this.listLimit = this.usersCount
      this.validInp = true;
  }

  deleteUser(user){
    if(window.confirm(`Are sure you want to delete User : ${user.username} ?`)){
      this.as.deleteUserAPI(user._id).subscribe(result =>{
        if(result.success){
          this.loadUsers();        
        }else{
          return false;
        }
      },err=>{
        return false;
      });
     }
  }

}
