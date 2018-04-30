import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { DataService } from '../data.service';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  constructor(private ds: DataService) { }

  books: Book[] =[];

  ngOnInit() {
  	this.getBooks();
  }

  getBooks(){
  	this.ds.getBooks()
  		.subscribe(bks => {
  			this.books = bks;
  		})
  }

/*
fetchData(){
    this.http.get("http://localhost:3000/api/books").subscribe(
      (res: Response)=> {
        this.books = res.json();
      });
 }
*/

}
