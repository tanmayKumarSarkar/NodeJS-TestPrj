import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // task list (SPA)
  items = ['Angular 4', 'React JS', 'Vue JS'];
  newItem = "";
  pushItem = function () {
    if(this.newItem != "") {
      this.items.push(this.newItem);
      this.newItem = "";
    }
  }
  removeItem = function (index) {
    this.items.splice(index, 1);
  }

  //pipelie
  name = "Tanmay";
  day = new Date(2016, 4, 22);
  arr = [5,9,2,22,6,3];

  //Template Driven forms
  onSubmit = function (user){
    console.log(user);
  }
}

/* Data Binding
title = 'app';
obj = {id: 1, name:"tanmay"};
arr = ['abc', 'def','ghi'];
isTrue = true;
str = "tan";*/
