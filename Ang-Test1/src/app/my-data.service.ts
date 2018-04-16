import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map' ;

@Injectable()
export class MyDataService {

  constructor(private http: Http) { }
  
  //Http Service
  fetchData(){
  	this.http.get('data/students.json')
  	.map((response)=>response.json())
  	.subscribe((data)=> console.log(data));
  }

  obj ={
  	id: "1",
  	name: "tanmay",
  	rollno: "143"
  }

  success(){
  	return "successful";
  }
}
