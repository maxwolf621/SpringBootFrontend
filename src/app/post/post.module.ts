import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ViewPostComponent,
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatIconModule
  ]
})
export class PostModule { }
