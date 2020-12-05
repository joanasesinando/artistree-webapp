import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { GoTopComponent } from './go-top/go-top.component';
import { JoinModalComponent } from './join-modal/join-modal.component';
import { SignInModalComponent } from './sign-in-modal/sign-in-modal.component';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    GoTopComponent,
    JoinModalComponent,
    SignInModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    GoTopComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ]
})
export class SharedModule { }
