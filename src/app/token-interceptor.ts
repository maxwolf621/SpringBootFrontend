/* To intercept the User's Token 
 * IF user's token is expire (which return 403)
 *    Then refresh the token
 */

import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/shared/auth.service';
import { catchError, switchMap } from 'rxjs/operators';
import { LoginResponse } from './auth/login/login-response.payload';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    NeedToRefreshToken = false;

    constructor(private authService:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.getToken()) {
            console.log("Add Token To the RequestPayload")
            this.addToken(req, this.authService.getToken());
        }
        return next.handle(req).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && 
                error.status === 403) 
            {
                return this.handleAuthErrors(req, next);
            } else {
                return throwError(error);
            }
        }));
    }

    /**
     * @description check if the user's token needs to refresh 
     * @param req rqeust to backend
     * @param next The `next` object represents the next interceptor in the chain of interceptors 
     * @returns refereshtoken
     */
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.NeedToRefreshToken) {
            this.NeedToRefreshToken = true;
            this.refreshTokenSubject.next(null);
        }
        return this.authService.refreshToken().pipe(
            switchMap((refreshTokenResponse: LoginResponse) => {
                this.NeedToRefreshToken = false;
                
                // go to next interceptor
                this.refreshTokenSubject.next(refreshTokenResponse.token);
               
                return next.handle(this.addToken(req, refreshTokenResponse.token));
            })
        )
    }

    /**
     * @description To ADD A HEADER IN a request, 
     * clone it first and modify the clone before passing it to next.handle()
     * @param req request to backend
     * @param token token we sent to backend
     * @returns A request that contains the header { 'Authorizaion' : 'beart TOKEN'}
     */
    private addToken(req: HttpRequest<any>, token: string){
        console.log("Set A JWT header");
        return req.clone({
            // add the new token to request
            setHeaders: {'Authorization': `Bearer ${token}`}
        });
    }

    

}