import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DiscoverArtistsComponent} from './discover-artists/discover-artists.component';

const routes: Routes = [
  {
    path: '',
    component: DiscoverArtistsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscoverArtistsRoutingModule { }
