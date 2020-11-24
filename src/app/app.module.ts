import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
    /*** Add individual firebase modules here ***/
    /*** See link: https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md ***/
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
