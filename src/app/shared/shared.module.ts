import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';


@NgModule({
  declarations: [NavbarComponent, FooterComponent, GoTopComponent],
    exports: [
        FooterComponent,
        NavbarComponent,
        GoTopComponent
    ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
