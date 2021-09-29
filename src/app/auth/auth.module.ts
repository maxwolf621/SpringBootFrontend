import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * components
 */
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Oauth2Component } from './oauth2/oauth2.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TokenVerifyComponent } from './token-verify/token-verify.component';
@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
    Oauth2Component,
    UserActivityComponent,
    ResetPasswordComponent,
    TokenVerifyComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,  
    FormsModule, // mat-formfield with [(ngModel)]
    FlexLayoutModule, 
    ReactiveFormsModule, // form group
    FontAwesomeModule,
    MaterialpackagesModule, // angular material
    SharedModule, 
    AuthRoutingModule,
  ],
  exports:[
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
  ]
})
export class AuthModule { }
