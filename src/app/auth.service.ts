import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";
import "rxjs/add/operator/do";

@Injectable()
export class AuthService {

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  //store UserName
  id:string

  login(value): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => {
      this.isLoggedIn = true;
      this.id = value;
    });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.id = null;
  }
}
