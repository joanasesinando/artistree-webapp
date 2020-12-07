import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { UserCardComponent } from './profile/user-card/user-card.component';
import { PillComponent } from './profile/pill/pill.component';
import { InterestsCardComponent } from './profile/interests-card/interests-card.component';
import { ReviewsComponent } from './profile/reviews/reviews.component';


@NgModule({
  declarations: [ProfileComponent, UserCardComponent, PillComponent, InterestsCardComponent, ReviewsComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
