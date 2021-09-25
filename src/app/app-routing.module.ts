import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserActivityComponent } from './auth/user-activity/user-activity.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'HomeComponent',
    pathMatch: 'full'
  }, 
  {
    path: 'user-activity/:username',
    component: UserActivityComponent,
    canActivate:[AuthGuard]
  },
  {
    path: "oauth2",
    redirectTo : 'HomeComponent',
  },
  {
    path: "user-profile:username",
    component: UserProfileComponent,
    canActivate:[AuthGuard]
  }
];
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
