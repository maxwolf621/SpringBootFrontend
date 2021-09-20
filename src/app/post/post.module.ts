import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { ViewPostComponent } from './view-post/view-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


@NgModule({
  declarations: [
    ViewPostComponent,
    CreatePostComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialpackagesModule,
    PostRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatAutocompleteModule,
    SharedModule
  ]
})
export class PostModule { }
