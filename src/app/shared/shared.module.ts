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
import { SortByComponent } from './sort-by/sort-by.component';
import { SubNavbarComponent } from './sub-navbar/sub-navbar.component';
import { ToggleComponent } from './toggle/toggle.component';
import { BannerCarouselComponent } from './banners/banner-carousel/banner-carousel.component';
import { ModalHeaderComponent } from './modals/modal-header/modal-header.component';
import { InputEmailComponent } from './inputs/input-email/input-email.component';
import { InputPasswordComponent } from './inputs/input-password/input-password.component';
import { InputTextComponent } from './inputs/input-text/input-text.component';
import { InputSelectComponent } from './inputs/input-select/input-select.component';
import { FilterListComponent } from './filters/filter-list/filter-list.component';
import { FilterPillComponent } from './filters/filter-pill/filter-pill.component';
import { InputTextareaComponent } from './inputs/input-textarea/input-textarea.component';
import { InputNumberComponent } from './inputs/input-number/input-number.component';
import { FilterBudgetComponent } from './filters/filter-budget/filter-budget.component';
import { NgInitDirective } from '../_directives/ng-init.directive';


@NgModule({
  declarations: [
    NgInitDirective,
    NavbarHomepageComponent,
    FooterComponent,
    GoTopComponent,
    JoinModalComponent,
    SignInModalComponent,
    NavbarComponent,
    BannerComponent,
    SortByComponent,
    SubNavbarComponent,
    ToggleComponent,
    BannerCarouselComponent,
    ModalHeaderComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputTextComponent,
    InputSelectComponent,
    FilterListComponent,
    FilterPillComponent,
    InputTextareaComponent,
    InputNumberComponent,
    FilterBudgetComponent
  ],
  exports: [
    NgInitDirective,
    FooterComponent,
    NavbarHomepageComponent,
    GoTopComponent,
    NavbarComponent,
    BannerComponent,
    SortByComponent,
    SubNavbarComponent,
    ToggleComponent,
    BannerCarouselComponent,
    ModalHeaderComponent,
    InputTextComponent,
    InputSelectComponent,
    FilterListComponent,
    FilterPillComponent,
    InputTextareaComponent,
    InputNumberComponent,
    FilterBudgetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class SharedModule { }
