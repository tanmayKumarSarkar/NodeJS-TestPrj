import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http) {}
  id : number;
  private headers = new Headers ({'Content-type' : 'application/json'});
  products = [];

  ngOnInit() {
    this.fetchData();
  }

  fetchData(){
    this.http.get("http://localhost:3600/products/").subscribe(
      (res: Response)=> {
        this.products = res.json();
      });
  }

  deleteProduct(id){
    if(confirm('Are You Sure?')) {
      const url = `${"http://localhost:3600/products/"}/${id}`;
      return this.http.delete(url, {headers: this.headers}).toPromise()
        .then(()=>{
          this.fetchData();
        })
    }
  }


}
