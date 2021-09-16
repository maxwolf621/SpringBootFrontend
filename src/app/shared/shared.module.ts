import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { CommentTileComponent } from './comment-tile/comment-tile.component';
import { PostTileComponent } from './post-tile/post-tile.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SubSideBarComponent } from './sub-side-bar/sub-side-bar.component';
import { SubTileComponent } from './sub-tile/sub-tile.component';
import { VoteButtonComponent } from './vote-button/vote-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';

@NgModule({
  declarations: [
    CommentTileComponent,
    PostTileComponent,
    SideBarComponent,
    SubSideBarComponent,
    SubTileComponent,
    VoteButtonComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MaterialpackagesModule
  ],
  exports:[
    CommentTileComponent,
    PostTileComponent,
    SideBarComponent,
    SubSideBarComponent,
    SubTileComponent,
    VoteButtonComponent
  ]
})
export class SharedModule { }