import { EventEmitter, Injectable, Output } from '@angular/core';
import { SignupRequestPayload } from '../sign-up/signup-request.payload';
import { config, Observable, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';

/**
 * @description Authentication
 */
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

  /**
   * @constructor for authentication (login, sigup)
   * @param http : interact with backend
   * @param localStorage : to store our jwt
   */
  constructor(private http:HttpClient, private localStorage: LocalStorageService) { }
  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    console.log("post to backend")
    return this.http.post(`${environment.apiAuth}/signup`, signupRequestPayload);
  }

  /**
   * @description login with username and password and 
   * and store(refrersh) the jwt in localsotrage
   */
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/login`, loginRequestPayload).pipe(map(data =>{
        this.localStorage.store('Token', data.token);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      }));
  }

  /**
   * @description Refresh the token (to update localstorage)
   */
  refreshToken() {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/refresh/token`,this.refreshTokenPayload)
                .pipe(tap(response => {
                  this.localStorage.clear('Token');
                  this.localStorage.clear('expiresAt');
                  this.localStorage.store('Token',response.token);
                  this.localStorage.store('expiresAt', response.expiresAt);
                }));
  }


  /**
   * @description CLEAR USER'S TOKEN AND REFRESH TOKEN FOR LOGOUT
   */
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
      this.localStorage.clear('Token');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
  }


  // getters for localStorage 
  getToken(){
    return this.localStorage.retrieve('Token');
  }
  getRefreshToken(){
     return this.localStorage.retrieve('refreshToken');
  }
  getUserName(){
    return this.localStorage.retrieve('username');
  }

  /**
   * @description this.getToken !=null ? true : false </pre> 
   */
  isLoggedIn() {
    return !!this.getToken();
  }

}
