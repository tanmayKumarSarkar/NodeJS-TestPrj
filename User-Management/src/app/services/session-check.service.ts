import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/interval';
import {Observable} from 'rxjs/Rx';


@Injectable()
export class SessionCheckService {

  constructor( private jwtHelper: JwtHelper){};

  intrvl: number = 1000;

  public validate( token:string ): Observable < any > {
    return Observable.interval(this.intrvl)
      .map( (x) => this.valiadteHelper(token) )
      .filter(resp => this.valiadteHelper(token));
  }

  valiadteHelper(token){    
    if(!this.jwtHelper.isTokenExpired(token) && localStorage.getItem('id_token') != null){
      return true;
    }else return false;    
  }

}
