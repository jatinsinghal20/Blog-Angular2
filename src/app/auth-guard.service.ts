import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuardService implements CanActivate,CanActivateChild{
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean{
    return this.canActivate(childRoute,state)
  }

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) { return true; }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;
    // Navigate to the login page with extras
    this.router.navigate(['/welcome']);
    return false;
  }

}
