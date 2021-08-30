import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent} from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { CreateSubComponent } from './sub/create-sub/create-sub.component';
import { ListSubsComponent } from './sub/list-subs/list-subs.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'sign-up', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: "list-sub", component: ListSubsComponent},
  {path: "create-sub", component: CreateSubComponent},
  {path: "create-post", component: CreatePostComponent},
  {path: "view-post", component: ViewPostComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
