import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CourseComponent} from './course/course.component';
import {EnrolComponent} from './enrol/enrol.component';

const routes: Routes = [
  {
    path: '',
    component: CourseComponent
  },
  {
    path: 'enrol',
    component: EnrolComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
