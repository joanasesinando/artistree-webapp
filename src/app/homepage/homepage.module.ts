import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import {SharedModule} from '../shared/shared.module';
import { FeaturesComponent } from './features/features.component';
import { CoverComponent } from './cover/cover.component';


@NgModule({
  declarations: [HomepageComponent, FeaturesComponent, CoverComponent],
    imports: [
        CommonModule,
        HomepageRoutingModule,
        SharedModule
    ]
})
export class HomepageModule { }
