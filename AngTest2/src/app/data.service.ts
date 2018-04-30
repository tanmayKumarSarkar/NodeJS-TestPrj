import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  getBooks(){
  	return this.http.get('http://localhost:3000/api/books')
  		.map(res => res.json());
  }

  addBook(book) {
  	let headers = new Headers();
  	headers.append('Content-Type', 'application/json');
  	return this.http.post('http://localhost:3000/api/book', book, {headers: headers})
  		.map(res => res.json());
  }

}
