import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubRoutingModule } from './sub-routing.module';
import { CreateSubComponent } from './create-sub/create-sub.component';
import { ListSubsComponent } from './list-subs/list-subs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ViewSubComponent } from './view-sub/view-sub.component';


@NgModule({
  declarations: [
    CreateSubComponent,
    ListSubsComponent,
    ViewSubComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SubRoutingModule,
    ReactiveFormsModule,
    MaterialpackagesModule
  ]
})
export class SubModule { }
