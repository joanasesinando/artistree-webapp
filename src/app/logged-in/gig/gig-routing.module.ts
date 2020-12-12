import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GigComponent} from './gig/gig.component';

const routes: Routes = [
  {
    path: '',
    component: GigComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GigRoutingModule { }
