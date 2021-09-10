import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent} from './auth/sign-up/sign-up.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubComponent } from './sub/create-sub/create-sub.component';
import { ListSubsComponent } from './sub/list-subs/list-subs.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: "list-subs", component: ListSubsComponent},
  {path: "create-sub", component: CreateSubComponent},
  {path: "create-post", component: CreatePostComponent},
  {path: "view-post/:postId", component: ViewPostComponent},
  {path: "user-profile/:username", component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
