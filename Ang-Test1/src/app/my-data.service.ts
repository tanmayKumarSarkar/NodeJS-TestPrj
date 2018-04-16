import { Injectable } from '@angular/core';

@Injectable()
export class MyDataService {

  constructor() { }
  
  obj ={
  	id: "1",
  	name: "tanmay",
  	rollno: "143"
  }

  success(){
  	return "successful";
  }
}
