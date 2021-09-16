import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authservice/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService,
              private router : Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const IsThisUserAuthenticated = this.authService.isLoggedIn();
    const username = this.authService.getUserName();
    const isUserValid = next.queryParams.username === username;
    if(!IsThisUserAuthenticated && !isUserValid){
      alert("You are not allow to enter this page");
      this.router.navigateByUrl('/');
    }
    return true;
  }
}
