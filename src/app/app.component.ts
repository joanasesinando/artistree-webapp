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

  createRegular(username: string, name: string, surname: string): void{
    this.auth.createRegular(username, name, surname, ['Dance', 'Music', 'Magic']);
  }
}
