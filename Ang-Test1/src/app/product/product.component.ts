import { Component, OnInit } from '@angular/core';
import { MyDataService } from './../my-data.service';
import { Http, Response, Headers } from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  //Services
	constructor (private newService: MyDataService, private http: Http) {}
  productObj: object = {};
  confirmationString : string = "New Product Has Been Added";
  isAdded : boolean = false;

  ngOnInit() {
  	//console.log(this.newService.success());
  	//console.log(this.newService.obj.name);
  }

  addNewProduct(product) {
    this.productObj = {
      "name" : product.name,
      "color" : product.color
    }
    this.http.post("http://localhost:3600/products/", this.productObj).subscribe((res: Response)=>{
      this.isAdded = true;
     })
  }

  /*createUser(req){
    var hVal = 0;
    customers.forEach((cust)=>{
      if(cust.id>hVal) hVal = cust.id;
    });
    hVal = hVal+1;
    console.log(hVal);
    var user = {
      id : hVal,
      f_name : req.body.f_name,
      l_name : req.body.l_name,
      email : req.body.email
    }
    return user;
  }*/

}
