import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';

/**
 * Components
 */
import { OverlayComponent } from './overlay/overlay.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from '../auth/login/login.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';
import { MainComponent } from './main/main.component';
import { CreatePostComponent } from '../post/create-post/create-post.component';

@NgModule({
  declarations: [
    HeaderComponent,
    OverlayComponent,
    MainComponent
  ],
  imports:[
    CommonModule,
    MaterialpackagesModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    OverlayComponent,
    MainComponent
  ],
  entryComponents:[
    LoginComponent,
    SignUpComponent,
    CreatePostComponent
  ]
})
export class LayoutModule { }
