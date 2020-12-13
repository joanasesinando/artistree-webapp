import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GigComponent} from './gig/gig.component';
import {BookComponent} from './book/book.component';

const routes: Routes = [
  {
    path: '',
    component: GigComponent
  },
  {
    path: 'book',
    component: BookComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GigRoutingModule { }
