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

    // The `next` object represents the next interceptor in the chain of interceptors
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.NeedToRefreshToken) {
            this.NeedToRefreshToken = true;
            this.refreshTokenSubject.next(null);
        }
        return this.authService.refreshToken().pipe(
            switchMap((refreshTokenResponse: LoginResponse) => {
                this.NeedToRefreshToken = false;
                this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
            })
        )
    }

    // To refreshToken
    // To alter a request, clone it first \
    //  and modify the clone before passing it to next.handle()
    private addToken(req: HttpRequest<any>, token: String){
        return req.clone({
            // add the new token to request
            setHeaders: {'Authorization': `Bearer ${token}`}
        });
    }

    

}