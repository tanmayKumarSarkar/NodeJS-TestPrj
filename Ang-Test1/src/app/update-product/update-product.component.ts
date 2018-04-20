import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import 'rxjs/add/operator/toPromise'

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  id: number;
  data: object = {};
  exists: boolean = false;
  products = [];
  productObj: object = {};
  private headers = new Headers ({'Content-type' : 'application/json'});

  constructor(private http: Http, private router: Router, private route: ActivatedRoute) { }

  updateProduct(product) {
    this.productObj = {
      "name" : product.name,
      "color" : product.color
    }
    const url = `${"http://localhost:3600/products/"}/${this.id}`;
    this.http.put(url, JSON.stringify(this.productObj), {headers: this.headers}).toPromise()
      .then(()=>{
        this.router.navigate(['/']);
      });
  }

  ngOnInit() {
    this.route.params.subscribe((params) =>{
      this.id = +params['id'];
    });
    this.http.get("http://localhost:3600/products/").subscribe(
      (res: Response)=> {
        this.products = res.json();
        this.data = this.products.find(item=> item.id == this.id);
        if(typeof this.data == 'undefined'){
          this.data = {"name": "", "color": ""};
          this.exists = false;
        }else{
          this.exists = true;
        }
      });
  }

}
