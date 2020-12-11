import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {SharedModule} from '../../shared/shared.module';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { LiveCardComponent } from './live-card/live-card.component';
import {ProfileModule} from '../profile/profile.module';
import {DiscoverArtistsModule} from '../discover-artists/discover-artists.module';


@NgModule({
  declarations: [HomepageComponent, LiveCardComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    SharedModule,
    SlickCarouselModule,
    ProfileModule,
    DiscoverArtistsModule
  ]
})
export class HomepageModule { }
