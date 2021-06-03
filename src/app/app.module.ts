/* ENOSEPC problem 
 * solution : https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
/* store data from backend */
import { NgxWebstorageModule } from 'ngx-webstorage';
/* For Notifications */
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** https://www.npmjs.com/package/@fortawesome/angular-fontawesome 
 *  For Icons
 */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EditorModule } from '@tinymce/tinymce-angular';
/** https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap
 *
 */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

/* Components */
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { TokenInterceptor } from './token-interceptor';
import { CreateSubComponent } from './sub/create-sub/create-sub.component';
import { ViewPostComponent } from './post/view-post/view-post.component';
import { ListSubsComponent } from './sub/list-subs/list-subs.component';
import { SideBarComponent } from 'src/app/shared/side-bar/side-bar.component';
import { CreatePostComponent } from './post/create-post/create-post.component';
import { PostTileComponent } from './shared/post-tile/post-tile.component';
import { VoteButtonComponent } from './shared/vote-button/vote-button.component';
import { SubSideBarComponent } from './shared/sub-side-bar/sub-side-bar.component';
import { HomeComponent } from './home/home.component';
import { CommentTileComponent } from './shared/comment-tile/comment-tile.component';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';



@NgModule({
  declarations: [
    HomeComponent,
    AppComponent,
    HeaderComponent,
    SignUpComponent,
    LoginComponent,
    CreateSubComponent,
    ViewPostComponent,
    ListSubsComponent,
    SideBarComponent,
    CreatePostComponent,
    PostTileComponent,
    VoteButtonComponent,
    SubSideBarComponent,
    SideBarComponent,
    VoteButtonComponent,
    CommentTileComponent,
    UserProfileComponent
  ],   
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    EditorModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
