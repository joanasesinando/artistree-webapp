import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverArtistsRoutingModule } from './discover-artists-routing.module';
import { DiscoverArtistsComponent } from './discover-artists/discover-artists.component';
import { ArtistCardComponent } from './discover-artists/artist-card/artist-card.component';


@NgModule({
  declarations: [DiscoverArtistsComponent, ArtistCardComponent],
  imports: [
    CommonModule,
    DiscoverArtistsRoutingModule
  ]
})
export class DiscoverArtistsModule { }
