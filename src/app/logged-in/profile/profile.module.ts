import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserCardComponent } from './user-card/user-card.component';
import { PillComponent } from './pill/pill.component';
import { InterestsCardComponent } from './interests-card/interests-card.component';
import { ProfileArtistComponent } from './profile-artist/profile-artist.component';
import { ProfileRegularComponent } from './profile-regular/profile-regular.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import { ReviewsCardComponent } from './reviews-card/reviews-card.component';
import { DescriptionCardComponent } from './description-card/description-card.component';
import { HighlightsCardComponent } from './highlights-card/highlights-card.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { GigsCardComponent } from './gigs-card/gigs-card.component';
import {DiscoverGigsModule} from '../discover-gigs/discover-gigs.module';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { CoursesCardComponent } from './courses-card/courses-card.component';


@NgModule({
    declarations: [
      ProfileComponent,
      UserCardComponent,
      PillComponent,
      InterestsCardComponent,
      ProfileArtistComponent,
      ProfileRegularComponent,
      ReviewsCardComponent,
      DescriptionCardComponent,
      HighlightsCardComponent,
      PortfolioComponent,
      GigsCardComponent,
      CoursesCardComponent
    ],
    exports: [
        PillComponent
    ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    SharedModule,
    DiscoverGigsModule,
    SlickCarouselModule
  ]
})
export class ProfileModule { }
