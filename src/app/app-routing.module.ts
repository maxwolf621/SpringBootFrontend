import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { MainComponent } from './layout/main/main.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'HomeComponent',
    pathMatch: 'full'
  }, 
  {
    path: 'user-profile/:username',
    //loadChildren : './auth/auth.module#AuthModule'
    component: UserProfileComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "oauth2",
    redirectTo : 'HomeComponent',
  }  
];
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
