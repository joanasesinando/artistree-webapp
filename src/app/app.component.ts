import { Component } from '@angular/core';
import firebase from 'firebase';
import {FirebaseAuthService} from './_services/authentication/firebase-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'artistree-webapp';
  constructor(private auth: FirebaseAuthService) {
  }
  signup(email: string, pass: string): void{
    this.auth.signup(email, pass);
  }
  login(email: string, pass: string): void{
    this.auth.login(email, pass);
  }
  logout(): void{
    this.auth.logout();
  }

  createArtist(username: string, name: string, surname: string): void{
    this.auth.createArtist(username, name, surname, ['Dance', 'Music', 'Magic']);
  }
  createCourse( _title: string, _price: number, _description: string): void{
    this.auth.createCourse( _title, _price, _description);
  }
  createBooking( _title: string,  _description: string, _price: number, _duration: number): void{
    this.auth.createBooking( _title,  _description, _price, _duration);
  }

  enrollInCourse( _title: string): void{
    this.auth.enrollInCourse(_title);
  }

  enrollInBooking( _title: string): void{
    this.auth.enrollInBooking(_title);
  }

  createRegular(username: string, name: string, surname: string): void{
    this.auth.createRegular(username, name, surname, ['Dance', 'Music', 'Magic']);
  }
}
