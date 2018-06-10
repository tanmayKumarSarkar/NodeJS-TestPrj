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
  listPages = [];
  listActivePage;

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
          this.listPages = [{index: 0, listStart: 0, listEnd: this.usersCount }];
          this.listActivePage = 0;
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
      //this.listStart = 0;
      //this.listEnd = this.listStart + this.listLimit;
      this.validInp = true;
      this.listPaging(this.usersCount, this.listLimit);
      console.log(this.listPages);
      this.listStart = this.listPages[0].listStart;
      this.listEnd = this.listPages[0].listEnd;
      this.listActivePage = this.listPages[0].index;
    }else{
      this.validInp = false;
    }
  }

  removeFilter(){
      this.listStart = 0;
      this.listEnd = this.listLimit = this.usersCount;
      this.listPages = [{index: 0, listStart: 0, listEnd: this.usersCount }];
      this.listActivePage = this.listPages[0].index;
      this.validInp = true;
  }

  listPaging(end, limit){
    this.listPages = [];
    let arrLen = (end% limit == 0) ? Math.floor(end/ limit) : Math.floor(end/ limit) + 1;
    console.log(end, limit, arrLen);
    let first = 0;
    for(let i=arrLen; i>0; i--){
      this.listPages.push({
        index: arrLen - i,
        listStart: first,
        listEnd: (first + limit) > end ? (first +(end% limit)) : (first + limit)
      }); 
      first = first + limit;
    }
  }

  nagivatePage(index){
    this.listStart = this.listPages[index].listStart;
    this.listEnd = this.listPages[index].listEnd;
    this.listActivePage = index;
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

  ngAfterViewChecked(){
    if(this.as.isNewlyLoaded || this.as.permission == undefined || this.as.permission == '' || (this.as.permission != 'admin' && this.as.permission != 'moderator')){
      this.rt.navigate(['/profile']);
    }
  }

  ngOnDestroy(){
    this.as.refreshLocalUser();
  }

}
