import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Regular} from '../../_domain/Regular';
import {AlertService} from '../../_util/alert.service';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {

  public currentUser: firebase.User = null;
  public isUserLoggedIn = null;

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private alertService: AlertService,
              private router: Router) {
    const that = this;

    firebaseAuth.onAuthStateChanged(user => {
      that.currentUser = user;
      that.isUserLoggedIn = !!that.currentUser;

      if (that.isUserLoggedIn && this.router.url === '/') {
        this.router.navigate(['/feed']);
      }
    });
  }

  signup(email: string, password: string): Promise<boolean> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this.alertService.showAlert('Thanks for joining!', 'You are now part of Artistree. We hope you feel inspired.', 'success');
        return true;
      })
      .catch(err => {
        this.alertService.showAlert('Something went wrong...', err.message, 'danger');
        return false;
      });
  }


  login(email: string, password: string): Promise<boolean> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        this.alertService.showAlert('Welcome back!', 'You successfully logged in to Artistree.', 'success');
        return true;
      })
      .catch(err => {
        this.alertService.showAlert('Something went wrong...', err.message, 'danger');
        return false;
      });
  }

  logout(): Promise<boolean> {
    return this.firebaseAuth.signOut().then(value => {
      this.alertService.showAlert('Sad to see you go', 'You successfully logged out of Artistree.', 'success');
      return true;
    })
    .catch(err => {
      this.alertService.showAlert('Something went wrong...', err.message, 'danger');
      return false;
    });
  }

  createRegular(handler: string, name: string, surname: string, areas: string[]): void {
    const r = new Regular(firebase.auth().currentUser.uid, firebase.auth().currentUser.email, name, surname, handler, areas);
    console.log(r);
    this.writeRegularData(handler, name, surname, areas);
  }

  writeRegularData(username: string, name: string, surname: string, areas: string[]): void{
    firebase.database().ref('users/Regulars/' + firebase.auth().currentUser.uid).set({
      handler: username,
      Name: name,
      Surname: surname,
      email: firebase.auth().currentUser.email,
      interests: areas
    }).then(value => {
      // TODO: alert
      console.log('Registado com sucesso!', value); });
  }

  writeArtistData(username: string, name: string, surname: string): void{
    firebase.database().ref('users/Artists/' + firebase.auth().currentUser.uid).set({
      handler: username,
      Name: name,
      Surname: surname,
      email: firebase.auth().currentUser.email
    }).then(value => {
      // TODO: alert
      console.log('Registado com sucesso!', value); });
  }

}




