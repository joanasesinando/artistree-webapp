import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course/course.component';
import {ProfileModule} from '../profile/profile.module';
import {GigModule} from '../gig/gig.module';
import {EnrolComponent} from './enrol/enrol.component';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [CourseComponent, EnrolComponent],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ProfileModule,
    GigModule,
    FormsModule,
    SharedModule
  ]
})
export class CourseModule { }
