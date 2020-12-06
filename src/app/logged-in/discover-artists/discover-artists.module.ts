import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverArtistsRoutingModule } from './discover-artists-routing.module';
import { DiscoverArtistsComponent } from './discover-artists/discover-artists.component';
import { ArtistCardComponent } from './discover-artists/artist-card/artist-card.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [DiscoverArtistsComponent, ArtistCardComponent],
  exports: [
    ArtistCardComponent
  ],
  imports: [
    CommonModule,
    DiscoverArtistsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class DiscoverArtistsModule { }
