import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutModule } from './layout/layout.module';
import { AuthModule } from './auth/auth.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './token-interceptor';
import { SubModule } from './sub/sub.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { PostModule } from './post/post.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],   
  imports: [
    LayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxWebstorageModule.forRoot(),
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    EditorModule,
    NgbModule,
    AuthModule,
    SubModule,
    HomeModule,
    SharedModule,
    PostModule,
    AuthRoutingModule,
    AppRoutingModule
  ],
  exports:[
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,
     useClass: TokenInterceptor,
     multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
