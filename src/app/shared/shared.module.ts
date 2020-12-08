import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarHomepageComponent } from './navbars/navbarHomepage/navbarHomepage.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';
import { JoinModalComponent } from './modals/join-modal/join-modal.component';
import { SignInModalComponent } from './modals/sign-in-modal/sign-in-modal.component';
import { NavbarComponent } from './navbars/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { BannerComponent } from './banners/banner/banner.component';
import { FilterComponent } from './filter/filter.component';
import { SortByComponent } from './sort-by/sort-by.component';
import { SubNavbarComponent } from './sub-navbar/sub-navbar.component';
import { ToggleComponent } from './toggle/toggle.component';
import { BannerCarouselComponent } from './banners/banner-carousel/banner-carousel.component';
import { ModalHeaderComponent } from './modals/modal-header/modal-header.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';


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
    SortByComponent,
    SubNavbarComponent,
    ToggleComponent,
    BannerCarouselComponent,
    ModalHeaderComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputTextComponent
  ],
    exports: [
        FooterComponent,
        NavbarHomepageComponent,
        GoTopComponent,
        NavbarComponent,
        BannerComponent,
        FilterComponent,
        SortByComponent,
        SubNavbarComponent,
        ToggleComponent,
        BannerCarouselComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
