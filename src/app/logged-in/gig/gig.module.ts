import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GigRoutingModule } from './gig-routing.module';
import { GigComponent } from './gig/gig.component';
import { OverviewCardComponent } from './overview-card/overview-card.component';
import {ProfileModule} from '../profile/profile.module';
import {BookComponent} from './book/book.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [GigComponent, OverviewCardComponent, BookComponent],
  exports: [
    OverviewCardComponent
  ],
  imports: [
    CommonModule,
    GigRoutingModule,
    ProfileModule,
    SharedModule,
    FormsModule
  ]
})
export class GigModule { }
