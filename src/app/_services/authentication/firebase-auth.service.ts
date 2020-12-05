import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';
import {AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import {Regular} from '../../_domain/Regular';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
  }
  signup(email: string, password: string): void {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Registado com sucesso!', value);
      })
      .catch(err => {
        console.log('Erro:', err.message);
      });
  }


  login(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Login efetuado com sucesso');
      })
      .catch(err => {
        console.log('Erro:', err.message);
      });
  }

  logout(): void {
    this.firebaseAuth.signOut().then(value => {
      console.log('Logout efetuado com sucesso');
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
      console.log('Registado com sucesso!', value); });
  }
  writeArtistData(username: string, name: string, surname: string): void{
    firebase.database().ref('users/Artists/' + firebase.auth().currentUser.uid).set({
      handler: username,
      Name: name,
      Surname: surname,
      email: firebase.auth().currentUser.email
    }).then(value => {
      console.log('Registado com sucesso!', value); });
  }

}




