import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private as: AuthService, private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.as.loggedIn()){
      if(state.url == '/profile'){
      return true;
      }
      else if(state.url == '/management'){
        if(this.as.permission == 'admin'){
          return true;
        }else{
          if(this.as.permission == undefined || this.as.permission == ''){
            this.router.navigate(['/profile']);
            return true;
          }
          console.log("s1",this.as.permission);
          return false;
        }
      }else{ 
        console.log("S2",this.as.permission);
        return false;
      }
    }
    else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
