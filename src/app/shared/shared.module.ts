import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarHomepageComponent } from './navbarHomepage/navbarHomepage.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    NavbarHomepageComponent,
    FooterComponent,
    GoTopComponent,
    JoinModalComponent,
    SignInModalComponent,
    NavbarComponent
  ],
  exports: [
    FooterComponent,
    NavbarHomepageComponent,
    GoTopComponent,
    NavbarComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }
