import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubRoutingModule } from './sub-routing.module';
import { CreateSubComponent } from './create-sub/create-sub.component';
import { ListSubsComponent } from './list-subs/list-subs.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialpackagesModule } from '../materialpackages/materialpackages.module';


@NgModule({
  declarations: [
    CreateSubComponent,
    ListSubsComponent
  ],
  imports: [
    CommonModule,
    SubRoutingModule,
    ReactiveFormsModule,
    MaterialpackagesModule
  ]
})
export class SubModule { }
