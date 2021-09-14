import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubRoutingModule } from './sub-routing.module';
import { CreateSubComponent } from './create-sub/create-sub.component';
import { ListSubsComponent } from './list-subs/list-subs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CreateSubComponent,
    ListSubsComponent
  ],
  imports: [
    CommonModule,
    SubRoutingModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule
  ]
})
export class SubModule { }
