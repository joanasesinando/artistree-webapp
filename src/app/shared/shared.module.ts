import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarHomepageComponent } from './navbarHomepage/navbarHomepage.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { NavbarComponent } from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { FilterComponent } from './filter/filter.component';
import { SortByComponent } from './sort-by/sort-by.component';


@NgModule({
  declarations: [
    NavbarHomepageComponent,
    FooterComponent,
    GoTopComponent,
    JoinModalComponent,
    SignInModalComponent,
    NavbarComponent,
    BannerComponent,
    FilterComponent,
    SortByComponent
  ],
  exports: [
    FooterComponent,
    NavbarHomepageComponent,
    GoTopComponent,
    NavbarComponent,
    BannerComponent,
    FilterComponent,
    SortByComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
