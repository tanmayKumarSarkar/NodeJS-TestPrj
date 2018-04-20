import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  rForm : FormGroup;
  post : any;
  desription : string = '';
  name : string = '';
  titleAlert : string ='This Field Is Required';

  constructor(private fb : FormBuilder) {
    this.rForm = fb.group({
      'name' : [null, Validators.required],
      'desription' : [null, Validators.compose([
        Validators.required,
        Validators.minLength(30),
        Validators.maxLength(500),
      ])],
      'validate' : ''
    });
  }

  addPost(post) {
    this.desription = post.desription;
    this.name = post.name;
  }

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe((validate)=>{
      if(validate == "1"){
        this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
        this.titleAlert = 'You need to provide at least 3 characters';
      }else{
        this.rForm.get('name').setValidators(Validators.required);
      }
      this.rForm.get('name').updateValueAndValidity();
    });
  }


}
