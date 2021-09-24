import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { AuthDTO } from '../auth-dto';
import { ActivatedRoute, Router } from '@angular/router';


interface OAuth2QueryParameter{
  token ?: string,
  error ?: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string>  = new EventEmitter();
  
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  oAuth2QueryParameter !: OAuth2QueryParameter;

  /**
   * @constructor for authentication (login, sign up)
   * @param http : interact with backend
   * @param localStorage : to store our jwt
   */
  constructor(private http:HttpClient, 
              private localStorage: LocalStorageService,
              private activateRoute: ActivatedRoute) 
  { 
    // initialize oauth2 redirect url's query parameters
    this.oAuth2QueryParameter = {
      token : "",
      error : ""
    }
  }

  getToken(){
    return this.localStorage.retrieve('Token');
  }
  getRefreshToken(){
     return this.localStorage.retrieve('refreshToken');
  }
  getUserName(){
    return this.localStorage.retrieve('username');
  }

  getUserPhoto(){
    // 
  }


  signup(signupRequestPayload: AuthDTO): Observable<any> {
    return this.http.post(`${environment.apiAuth}/signup`, signupRequestPayload);
  }


  login(loginRequestPayload: AuthDTO): Observable<boolean> {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/login`, loginRequestPayload).pipe
    (
      map(data =>{
        this.localStorage.store('Token', data.token);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        return true;
      })
    );
  }

  refreshToken() {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/refresh/token`,this.refreshTokenPayload).pipe
    (
      tap(response => {
        this.localStorage.clear('Token');
        this.localStorage.clear('expiresAt');
        this.localStorage.store('Token',response.token);
        this.localStorage.store('expiresAt', response.expiresAt);
      })
    );
  }

  logout(){
    this.http.post('', this.refreshTokenPayload, { responseType: 'text' }).subscribe
    (
      data => {
        console.log(data);
    }, error => {
      throwError(error);
    })

      this.localStorage.clear('Token');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
  }

  /**
   * @description this.getToken !=null ? true : false </pre> 
   */
  isLoggedIn() {
    return !!this.getToken();
  }


  _signOrLoginWithOAuth2(url:string){
    this.http.get<any>(url).pipe
    (
      tap(response => {
        console.info("response" + response);
      })
    )
  }


  signOrLoginWithOAuth2(){
    // get multiple query parameters
    this.activateRoute.queryParams.subscribe
    (
      (queryParameters) =>{
        this.oAuth2QueryParameter = {
          token !: queryParameters.token,
          error !: queryParameters.error
        }
        console.info(this.oAuth2QueryParameter);       
      }, (error) =>{
        console.warn("Error" + error);
      }
    )
  }

}
