import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import {ProfileModule} from '../profile/profile.module';
import {GigModule} from '../gig/gig.module';


@NgModule({
  declarations: [CourseComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ProfileModule,
    GigModule
  ]
})
export class CourseModule { }
