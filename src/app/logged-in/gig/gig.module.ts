import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GigRoutingModule } from './gig-routing.module';
import { GigComponent } from './gig/gig.component';


@NgModule({
  declarations: [GigComponent],
  imports: [
    CommonModule,
    GigRoutingModule
  ]
})
export class GigModule { }
