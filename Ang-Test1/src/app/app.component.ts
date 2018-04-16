import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyDataService } from './my-data.service';

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

  //Model Driven forms
  form;
  formCon;
  ngOnInit(){
    this.form = new FormGroup({
    firstname : new FormControl("", Validators.compose([
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[\\w\\-\\s/]+')
      ])),
    lastname : new FormControl("", this.textValidator),
    languages : new FormControl("")
    });

    //Converter Form App
    {
    this.formCon = new FormGroup({
    decimal : new FormControl(""),
    binary : new FormControl(""),
    octal : new FormControl(""),
    hexa : new FormControl("")
    });
    }
  
    //Services
    //console.log(this.newService.success());
    this.newService.obj.name ="TANMAY";

  }
  // End of OnInit



  d=0;
  b=0;
  o=0;
  h=0;
  decimalChanged = function (oldvalue, newvalue) {
    if(newvalue != "" && !isNaN(newvalue) ){
      this.formCon.patchValue({binary: parseInt(newvalue, 10).toString(2)});
      this.formCon.patchValue({octal: parseInt(newvalue, 10).toString(8)});
      this.formCon.patchValue({hexa: parseInt(newvalue, 10).toString(16).toUpperCase()});
    }else{
      this.formCon.patchValue({binary: "", octal: "", hexa:""});
    }
  }
  binaryChanged = function (newvalue) {
    this.b = this.b +1;
    if(this.b ==1){
      if(newvalue != "" && !isNaN(newvalue) ){
        this.formCon.patchValue({decimal: parseInt(newvalue, 2).toString(10)});
      }else{
        this.formCon.patchValue({decimal:""});
      }
      this.b = 0;
    }    
  }
  octalChanged = function (newvalue) {
    this.o = this.o +1;
    if(this.o ==1){
      if(newvalue != "" && !isNaN(newvalue) ){
        this.formCon.patchValue({decimal: parseInt(newvalue, 8).toString(10)});
      }else{
        this.formCon.patchValue({decimal:""});
      }
      this.o = 0;
    }    
  }
  hexalChanged = function (newvalue) {
    this.h = this.h +1;
    if(this.h ==1){
      if(newvalue != ""){
        this.formCon.patchValue({decimal: parseInt(newvalue, 16).toString(10)});
      }else{
        this.formCon.patchValue({decimal:""});
      }
      this.h = 0;
    }    
  }


// Template Driven Form Validation
textValidator(control){
  if(control.value.length<3){return {'lastname':true};}
}


//Services
constructor (private newService: MyDataService){

}



  //Converter Form App
  /*formCon;
  ngOnInit(){
    this.formCon = new FormGroup({
    decimal : new FormControl(""),
    binary : new FormControl(""),
    octal : new FormControl(""),
    hexa : new FormControl("")
  });
  } */



}

/* Data Binding
title = 'app';
obj = {id: 1, name:"tanmay"};
arr = ['abc', 'def','ghi'];
isTrue = true;
str = "tan";*/
