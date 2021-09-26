import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserActivityComponent } from './auth/user-activity/user-activity.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: "oauth2",
    redirectTo : 'HomeComponent',
  },
];
@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
