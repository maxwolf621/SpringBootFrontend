import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : 'HomeComponent',
    pathMatch: 'full'
  },
  {
    path : 'create-post',
    loadChildren : './post/post.module#PostModule'
  },  
  {
    path: 'user-profile/:username',
    //loadChildren : './auth/auth.module#AuthModule'
    component: UserProfileComponent,
    canActivate:[AuthGuard]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
