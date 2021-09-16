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
@NgModule({
  declarations: [
    SignUpComponent,
    LoginComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialpackagesModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
  ],
  exports:[
    SignUpComponent,
    LoginComponent,
    UserProfileComponent,
  ]
})
export class AuthModule { }
