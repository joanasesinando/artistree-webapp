import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GigRoutingModule } from './gig-routing.module';
import { GigComponent } from './gig/gig.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import {ProfileModule} from '../profile/profile.module';


@NgModule({
  declarations: [GigComponent, OverviewCardComponent],
  exports: [
    OverviewCardComponent
  ],
  imports: [
    CommonModule,
    GigRoutingModule,
    ProfileModule
  ]
})
export class GigModule { }
