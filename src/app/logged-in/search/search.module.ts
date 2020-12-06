import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';
import {SharedModule} from '../../shared/shared.module';
import {DiscoverArtistsModule} from '../discover-artists/discover-artists.module';
import {DiscoverGigsModule} from '../discover-gigs/discover-gigs.module';
import {AcademyModule} from '../academy/academy.module';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule,
    DiscoverArtistsModule,
    DiscoverGigsModule,
    AcademyModule
  ]
})
export class SearchModule { }
