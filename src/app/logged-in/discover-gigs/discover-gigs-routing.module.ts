import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DiscoverGigsComponent} from './discover-gigs/discover-gigs.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverGigsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverGigsRoutingModule { }
