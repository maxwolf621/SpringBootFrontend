import { EventEmitter, Injectable, Output } from '@angular/core';
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { config, Observable, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private http:HttpClient, private localStorage: LocalStorageService) { }
  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    console.log("post to backend")
    return this.http.post(`${environment.apiAuth}/signup`, signupRequestPayload);
  }

  // login with username and password
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/login`, loginRequestPayload).pipe(map(data =>{
        console.log(`data ${data}`);
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

  // ask backend to refresh the token
  refreshToken() {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/refresh/token`,this.refreshTokenPayload)
                .pipe(tap(response => {
                  this.localStorage.clear('authenticationToken');
                  this.localStorage.clear('expiresAt');
                  // new Token and Expiration Time of new token
                  this.localStorage.store('authenticationToken',response.authenticationToken);
                  this.localStorage.store('expiresAt', response.expiresAt);
                }));
  }
  // CLEAR USER'S TOKEN AND REFRESH TOKEN 
  // FIRST BACKEND THEN FRONTEND
  logout(){
    this.http.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      // clearing backend
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
      // clearing localStorage
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
  }


  //Getter
  getToken(){
    return this.localStorage.retrieve('authenticationToken');
  }
  getRefreshToken(){
     return this.localStorage.retrieve('refreshToken');
  }
  getUserName(){
    return this.localStorage.retrieve('username');
  }

  // return this.getToken !=null ? true : false 
  isLoggedIn() {
    return !!this.getToken();
  }

}
