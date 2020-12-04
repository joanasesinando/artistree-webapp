import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user: Observable<firebase.User>;
  constructor(private firebaseAuth: AngularFireAuth) {
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
    this.firebaseAuth.signOut();
  }

}
