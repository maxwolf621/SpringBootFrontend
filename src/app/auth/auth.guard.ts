import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './authservice/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService,
              private router : Router,
              private toastr : ToastrService){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const IsThisUserAuthenticated = this.authService.isLoggedIn();
    const username = this.authService.getUserName();
    const isUserValid = next.queryParams.username === username;
    
    if(!IsThisUserAuthenticated && !isUserValid){
     
      this.toastr.error("Please Login To Access This Page");
      this.router.navigateByUrl('/');
    }
    return true;
  }
}
