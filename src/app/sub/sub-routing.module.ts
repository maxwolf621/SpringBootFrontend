import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubsComponent } from './list-subs/list-subs.component';
import { ViewSubComponent } from './view-sub/view-sub.component';


const routes: Routes = [
  {
    path : 'list-sub',
    component: ListSubsComponent
  },
  {
    path : 'view-sub/:subId',
    component: ViewSubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubRoutingModule { }
