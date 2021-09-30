import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AuthGuard } from './auth.guard';
import { Oauth2Component } from './oauth2/oauth2.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
    children : [

    ]
  },
  {
    path : 'user-activity/:username',
    component : UserActivityComponent,
    canActivate : [AuthGuard],
  },
  {
    path : 'user-profile/:username',
    component: UserProfileComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'oauth2',
    component : Oauth2Component
  }
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
