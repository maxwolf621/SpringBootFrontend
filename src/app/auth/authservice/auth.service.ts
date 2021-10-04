import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { LoginResponse } from '../login/login-response.payload';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { environment } from 'src/environments/environment';
import { AuthDTO } from '../auth-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {


  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string>  = new EventEmitter();

  user : User = {
    username : "",
    avatar : "",
    mail : "",
    aboutMe: ""
  }
  
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
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


  /**
   * @constructor for authentication (login, sign up)
   * @param http : interact with backend
   * @param localStorage : to store our jwt
   */
  constructor(private http:HttpClient, 
              private localStorage: LocalStorageService) {}


  signup(signupRequestPayload: AuthDTO): Observable<any> {
    return this.http.post(`${environment.apiAuth}/signup`, signupRequestPayload,
    {
      responseType : 'text'
    });
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

  // called by interceptor 
  refreshToken() {
    return this.http.post<LoginResponse>(`${environment.apiAuth}/refreshToken`,
                                          this.refreshTokenPayload).pipe
    (
      tap(response => { // change the expired token
        console.info("Refresh Token ..." );
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
   * @description verify account by sending valid token to backend 
   */
  verifyWithToken(token : string) : Observable<HttpResponse<any>> {
    
    console.info(`${environment.apiAuth}/accountVerification/${token}`);

    const options  = {
    }

    return this.http.get<any>(`${environment.apiAuth}/accountVerification/`, 
    {
      params : new HttpParams().set('token', token),  
    });
  }

  /**
   * @description this.getToken !=null ? true : false </pre> 
   */
  isLoggedIn() {
    return !!this.getToken();
  }

  /**
   * @description send token for the user who forgetting password 
   * */ 
  forgetPassword(resetEmailPayload : AuthDTO) : Observable<any>{
    //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http.post(`${environment.apiAuth}/forgetPassword`, resetEmailPayload, 
    {
      //headers : headers,
      responseType : 'text'
    }); 
  }


  resetPassword(resetPasswordPayload : AuthDTO) : Observable<any>{
    return this.http.post(`${environment.apiAuth}/resetPassword`, resetPasswordPayload,
    {
      responseType : 'text'
    });
  }

  changePassword(updatePasswordPayload:AuthDTO): Observable<any>{
    
    return this.http.post(`${environment.apiUserProfile}/changePassword`, updatePasswordPayload,
    {
      responseType : 'text'
    });
  }

  
  /**
   * @description get user profile from backend
   */
   getUserInformation(): Observable<User> {
    return this.http.get<User>(`${environment.apiUserProfile}/account`);
  }

  /**
   * @description update user profile 
   */
  updateUserInformation(user : User){
    return this.http.post<any>(`${environment.apiUserProfile}/updateAccount`, user );
  }

}
