import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListSubsComponent } from './list-subs/list-subs.component';


const routes: Routes = [
  {
    path : 'list-sub',
    component: ListSubsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubRoutingModule { }
