import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) { }

  ngOnInit() {
  	this.fetchData();
  }

  books = [];

  fetchData(){
    this.http.get("http://localhost:3000/api/books").subscribe(
      (res: Response)=> {
        this.books = res.json();
      });
  }


}
