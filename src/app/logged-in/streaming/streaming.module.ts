import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamingComponent } from './streaming/streaming.component';
import {ProfileModule} from '../profile/profile.module';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [StreamingComponent],
  imports: [
    CommonModule,
    StreamingRoutingModule,
    ProfileModule,
    SharedModule
  ]
})
export class StreamingModule { }
