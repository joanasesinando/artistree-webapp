import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserCardComponent } from './user-card/user-card.component';
import { PillComponent } from './pill/pill.component';
import { InterestsCardComponent } from './interests-card/interests-card.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ProfileArtistComponent } from './profile-artist/profile-artist.component';
import { ProfileRegularComponent } from './profile-regular/profile-regular.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ProfileComponent, UserCardComponent, PillComponent, InterestsCardComponent, ReviewsComponent, ProfileArtistComponent, ProfileRegularComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
