import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';
import { ReactiveFormsModule } from '@angular/forms';
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
@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
    Oauth2Component,
    UserActivityComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialpackagesModule,
    SharedModule,
  ],
  exports:[
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
  ]
})
export class AuthModule { }
