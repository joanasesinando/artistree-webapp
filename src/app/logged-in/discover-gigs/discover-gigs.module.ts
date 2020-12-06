import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverGigsRoutingModule } from './discover-gigs-routing.module';
import { DiscoverGigsComponent } from './discover-gigs/discover-gigs.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { GigCardComponent } from './discover-gigs/gig-card/gig-card.component';


@NgModule({
  declarations: [DiscoverGigsComponent, GigCardComponent],
  imports: [
    CommonModule,
    DiscoverGigsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DiscoverGigsModule { }
