import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { MainComponent } from '../layout/main/main.component';
import { UserActivityComponent } from './user-activity/user-activity.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path : '',
    component : HomeComponent,
  },
  {
    path : 'user-activity/:username',
    component : UserActivityComponent
  },
  {
    path : 'user-profile',
    component: UserProfileComponent
  }
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
