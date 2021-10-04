/* To intercept the User's Token 
 * IF user's token is expire (which return 403)
 *    Then refresh the token
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';
import { AuthService } from './auth/authservice/auth.service';

/**
 * 
 * @link [reference] https://stackoverflow.com/questions/47400929/how-to-add-authorization-header-to-angular-http-request
 */
@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    NeedToRefreshToken = false;
    
    constructor(private authService:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // get token from Local Storage
        let jwt = this.authService.getToken();

        // if token exists add it to the header
        if (jwt) {
            req = this.addToken(req, jwt);
        }

        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
            }
        }));
    }

    /**
     * @description refresh the jwt of the user 
     * @param next The `next` object represents the next interceptor in the chain of interceptors 
     */
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.NeedToRefreshToken) {
            this.NeedToRefreshToken = true;
            this.refreshTokenSubject.next(null);
        }

        return this.authService.refreshToken().pipe(
            // get a valid refresh jwt
            switchMap((refreshTokenResponse: LoginResponse) => {
                console.info("Token Is Expired");
                
                this.NeedToRefreshToken = false;

                this.refreshTokenSubject.next(refreshTokenResponse.token);
               
                return next.handle(this.addToken(req, refreshTokenResponse.token));
            })
        )
    }

    /**
     * @description To ADD A HEADER In a request
     * @returns A request that contains the header { 'Authorization' : 'bearer TOKEN'}
     */
    private addToken(req: HttpRequest<any>, jwt: string){
        console.log("Add JWT header In Request" + jwt);
        return req.clone({
            setHeaders: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept'       : 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
        });
    }
}