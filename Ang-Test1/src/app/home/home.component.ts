import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise'
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: Http, private cdr: ChangeDetectorRef) {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
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

  ngAfterViewInit() {
        setInterval(() => {
          this.servers.forEach ((server)=>{
            server.serverc = Math.random();
        });
        }, 2000);
    }

  ////ngStyle
  servers =[
    {'servername': 'india', 'serverid' : '10', 'serverc': Math.random()},
    {'servername': 'us', 'serverid' : '12', 'serverc': Math.random()},
    {'servername': 'mex', 'serverid' : '50', 'serverc': Math.random()},
    {'servername': 'uk', 'serverid' : '40', 'serverc': Math.random()}
  ];
  serverStatus: string = 'offline';

  getServerStatus(s){
    return s > 0.5 ? 'online' : 'offline';
    //this.cdr.detectChanges();
    //this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    //this.cdr.markForCheck();
    //return Math.random() > 0.5 ? 'online' : 'offline';
    //return this.serverStatus;
  }
  getColor(s) {
    //console.log(this.getServerStatus(s) === 'online' ? 'green' : 'red');
    return this.getServerStatus(s) === 'online' ? 'green' : 'red';
  }



}
