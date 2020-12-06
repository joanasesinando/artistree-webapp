import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AcademyRoutingModule } from './academy-routing.module';
import { AcademyComponent } from './academy/academy.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule} from '@angular/forms';
import { CourseCardComponent } from './academy/course-card/course-card.component';


@NgModule({
  declarations: [AcademyComponent, CourseCardComponent],
  exports: [
    CourseCardComponent
  ],
  imports: [
    CommonModule,
    AcademyRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class AcademyModule { }
