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

<<<<<<< HEAD
/**
 * reference https://stackoverflow.com/questions/47400929/how-to-add-authorization-header-to-angular-http-request
 */
=======
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    NeedToRefreshToken = false;
<<<<<<< HEAD
    constructor(private authService:AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let jwt = this.authService.getToken();
        // fetch the jwt from backend
        if (jwt) {
            console.log("Add Token To the RequestPayload");
            req = this.addToken(req, jwt);
        }

        return next.handle(req).pipe(
            catchError(error => {
                // if http status equal 403 then
                if (error instanceof HttpErrorResponse && error.status === 403) {
                    return this.handleAuthErrors(req, next);
                } else {
                    return throwError(error);
=======

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
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
            }
        }));
    }

<<<<<<< HEAD
    /**
     * @description check if the user's jwt needs to refresh or not 
     * @param req rqeust to backend
     * @param next The `next` object represents the next interceptor in the chain of interceptors 
     * @returns refereshtoken
     */
=======
    // The `next` object represents the next interceptor in the chain of interceptors
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
    private handleAuthErrors(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.NeedToRefreshToken) {
            this.NeedToRefreshToken = true;
            this.refreshTokenSubject.next(null);
        }
<<<<<<< HEAD
        // to get a valid refresh jwt 
        // add this token in the request header
        return this.authService.refreshToken().pipe(
            switchMap((refreshTokenResponse: LoginResponse) => {
                this.NeedToRefreshToken = false;
                
                // go to next interceptor
                this.refreshTokenSubject.next(refreshTokenResponse.token);
               
                return next.handle(this.addToken(req, refreshTokenResponse.token));
=======
        return this.authService.refreshToken().pipe(
            switchMap((refreshTokenResponse: LoginResponse) => {
                this.NeedToRefreshToken = false;
                this.refreshTokenSubject.next(refreshTokenResponse.authenticationToken);
                return next.handle(this.addToken(req, refreshTokenResponse.authenticationToken));
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
            })
        )
    }

<<<<<<< HEAD
    /**
     * @description To ADD A HEADER IN a request, 
     * clone it first and modify the clone before passing it to next.handle()
     * @param req request to backend
     * @param token token we sent to backend
     * @returns A request that contains the header { 'Authorizaion' : 'beart TOKEN'}
     */
    private addToken(req: HttpRequest<any>, jwt: string){
        console.log("Set A JWT header");
        return req.clone({
            setHeaders: {
                'Content-Type' : 'application/json; charset=utf-8',
                'Accept'       : 'application/json',
                'Authorization': `Bearer ${jwt}`,
            },
=======
    // To refreshToken
    // To alter a request, clone it first \
    //  and modify the clone before passing it to next.handle()
    private addToken(req: HttpRequest<any>, token: String){
        return req.clone({
            // add the new token to request
            setHeaders: {'Authorization': `Bearer ${token}`}
>>>>>>> 16d04d84c7edae24a77f9e0157dea16273c2cad6
        });
    }

    

}