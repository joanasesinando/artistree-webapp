import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AcademyComponent} from './academy/academy.component';

const routes: Routes = [
  {
    path: '',
    component: AcademyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcademyRoutingModule { }
