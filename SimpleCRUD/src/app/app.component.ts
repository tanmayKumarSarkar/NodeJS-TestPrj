import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor (private httpClient:HttpClient){}

  name: string = '';
  age: number;
  isFound: boolean;
  pName: string;
  pAge : number;
  uid : number;
  uName: string;
  uAge : number;
  profiles = [];

  onNameKeyUp(evnt: any){
  	this.name = evnt.target.value;
  	this.isFound = false;
  }
  getProfile(){
  	this.httpClient.get(`http://localhost:3600/profiles/?name=${this.name}`)
  	.subscribe((data:any[])=>{
  		if(data.length){
  			this.age = data[0].age;
  			this.isFound = true;
  		}
  	})
  }

  postProfile(){
  	this.httpClient.post(`http://localhost:3600/profiles/`, {
  		name: this.pName,
  		age: this.pAge
  	})
  	.subscribe((data:any[])=>{
  		console.log({data});
  		this.fetchProfile();
  	})
  }

  fetchProfile(){
    this.httpClient.get("http://localhost:3600/profiles/")
    .subscribe((data:any)=>{
  		if(data.length){
  			this.profiles = data;
  			//console.log(this.profiles);
  		}
  	});
    /*.subscribe(
      (res: Response)=> {
        this.profiles = res.json();
        console.log(this.profiles);
      });*/
  }

  updateProfile(){
  	this.httpClient.put(`http://localhost:3600/profiles/${this.uid}`, {
  		name: this.uName,
  		age: this.uAge
  	})
  	.subscribe((data:any[])=>{
  		console.log({data});
  		this.fetchProfile();
  	})
  }

  editProfile(uid, uName, uAge) {
  	this.uid = uid;
  	this.uName = uName;
  	this.uAge = uAge;
  }

  deleteProfile(uid){
  	this.httpClient.delete(`http://localhost:3600/profiles/${uid}`)
  	.subscribe((data:any[])=>{
  		console.log({data});
  		this.fetchProfile();
  	})
  }

  ngOnInit() {
    this.fetchProfile();
  }

}
