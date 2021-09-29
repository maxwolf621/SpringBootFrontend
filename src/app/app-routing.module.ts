import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { TokenVerifyComponent } from './auth/token-verify/token-verify.component';

const routes: Routes = [
  {
    path : 'tokenVerify/:token',
    component : TokenVerifyComponent
  },
  {
    path : 'resetPassword/:token',
    component : ResetPasswordComponent
  }

];
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }