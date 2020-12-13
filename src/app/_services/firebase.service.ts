import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

import {AlertService} from '../_util/alert.service';
import {Live} from '../_domain/Live';
import {LivePost} from '../_domain/LivePost';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public auth: AngularFireAuth;
  public currentUser: firebase.User = null;
  public isUserLoggedIn = null;

  constructor(private firebaseAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private alertService: AlertService,
              private router: Router) {
    const that = this;
    that.auth = firebaseAuth;

    firebaseAuth.onAuthStateChanged(user => {
      that.currentUser = user;
      that.isUserLoggedIn = !!that.currentUser;

      if (that.isUserLoggedIn && this.router.url === '/') {
        this.router.navigate(['/feed']);
      }
    });
  }

  /*** --------------------------------------------- ***/
  /*** -------- General Database Functions --------- ***/
  /*** --------------------------------------------- ***/

  public setDatabaseData(path, data): Promise<void> {
    return firebase.database().ref(path).update(data);
  }

  public getDatabaseData(path): Promise<any> {
    return firebase.database().ref(path).once('value').then(snapshot => snapshot.val());
  }

  /*** --------------------------------------------- ***/
  /*** ------------ Joining Artistree -------------- ***/
  /*** --------------------------------------------- ***/

  signup(type: string, email: string, password: string, name: string, handler: string, avatar: string, interests: string[],
         joiningTimestamp: number, artisticAreas?: string[], title?: string): Promise<void> {

    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {

        switch (type) {
          case 'artist':
            this.setDatabaseData('users/artists/' + firebase.auth().currentUser.uid, {
              email,
              name,
              handler,
              avatar,
              interests,
              artisticAreas,
              title,
              type,
              joiningTimestamp,
              relevance: Math.floor(Math.random() * Math.floor(10000)),
              popularity: Math.floor(Math.random() * Math.floor(10000))
            }).then(() => {
              this.alertService.showAlert('Thanks for joining!', 'You are now part of Artistree. We hope you feel inspired.', 'success');

            }).catch(err => {
              this.alertService.showAlert('Something went wrong...', err.message, 'danger');
            });
            break;

          case 'regular':
          default:
            this.setDatabaseData('users/regular/' + firebase.auth().currentUser.uid, {
              email,
              name,
              handler,
              avatar,
              interests,
              type,
              joiningTimestamp
            }).then(() => {
              this.alertService.showAlert('Thanks for joining!', 'You are now part of Artistree. We hope you feel inspired.', 'success');

            }).catch(err => {
              this.alertService.showAlert('Something went wrong...', err.message, 'danger');
            });
        }
      });
  }

  /*** --------------------------------------------- ***/
  /*** ------------------- Login ------------------- ***/
  /*** --------------------------------------------- ***/

  login(email: string, password: string): Promise<boolean> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.alertService.showAlert('Welcome back!', 'You successfully logged in to Artistree.', 'success');
        return true;
      })
      .catch(err => {
        this.alertService.showAlert('Something went wrong...', err.message, 'danger');
        return false;
      });
  }

  /*** --------------------------------------------- ***/
  /*** ------------------ Logout ------------------- ***/
  /*** --------------------------------------------- ***/

  logout(): Promise<boolean> {
    return this.firebaseAuth.signOut().then(() => {
      this.alertService.showAlert('Sad to see you go', 'You successfully logged out of Artistree.', 'success');
      return true;
    })
      .catch(err => {
        this.alertService.showAlert('Something went wrong...', err.message, 'danger');
        return false;
      });
  }

  /*** --------------------------------------------- ***/
  /*** ------------------- Exists ------------------ ***/
  /*** --------------------------------------------- ***/

  emailAlreadyExists(other: string): Promise<boolean> {
    return this.getAllEmails().then(emails => {
      for (const email of emails) {
        if (email === other) return true;
      }
      return false;
    });
  }

  handlerAlreadyExists(other: string): Promise<boolean> {
    return this.getAllHandlers().then(handlers => {
      for (const handler of handlers) {
        if (handler === other) return true;
      }
      return false;
    });
  }

  /*** --------------------------------------------- ***/
  /*** -------------------- Get -------------------- ***/
  /*** --------------------------------------------- ***/

  getAllHandlers(): Promise<string[]> {
    const handlers: string[] = [];

    return this.getDatabaseData('users').then(users => {
      if (users) {
        for (const key in users.artists) {
          if (Object.prototype.hasOwnProperty.call(users.artists, key)) {
            const user = users.artists[key];
            handlers.push(user.handler);
          }
        }

        for (const key in users.regular) {
          if (Object.prototype.hasOwnProperty.call(users.regular, key)) {
            const user = users.regular[key];
            handlers.push(user.handler);
          }
        }
      }

      return handlers;
    });
  }

  getAllEmails(): Promise<string[]> {
    const emails: string[] = [];

    return this.getDatabaseData('users').then(users => {
      if (users) {
        for (const key in users.artists) {
          if (Object.prototype.hasOwnProperty.call(users.artists, key)) {
            const user = users.artists[key];
            emails.push(user.email);
          }
        }

        for (const key in users.regular) {
          if (Object.prototype.hasOwnProperty.call(users.regular, key)) {
            const user = users.regular[key];
            emails.push(user.email);
          }
        }
      }

      return emails;
    });
  }

  getUserInfo(uid: string): Promise<any> {
    return this.getDatabaseData('users/artists/' + uid).then(artist => {
      if (artist) return artist;
      return this.getDatabaseData('users/regular/' + uid).then(regular => regular);
    });
  }

  getGigInfo(gid: string): Promise<any> {
    return this.getDatabaseData('gigs/' + gid).then(gig => {
      if (gig) return gig;
    });
  }

  getCourseInfo(cid: string): Promise<any> {
    return this.getDatabaseData('courses/' + cid).then(course => {
      if (course) return course;
    });
  }

  getAllLives(): Promise<Live[]> {
    return this.getDatabaseData('lives/');
  }

  getLiveInfo(id: string): Promise<Live> {
    return this.getDatabaseData('lives/' + id);
  }

  /*** --------------------------------------------- ***/
  /*** -------------------- Lives ------------------ ***/
  /*** --------------------------------------------- ***/

  setLiveInfo(live: Live): Promise<void> {
    return this.setDatabaseData('lives/' + live.id, live);
  }

  /*** --------------------------------------------- ***/
  /*** ------------------ Reviews ------------------ ***/
  /*** --------------------------------------------- ***/

  // FiXME: update with new stuff
  createReview(fromID: string, toID: string, rate: number, description: string): void {
    this.getDatabaseData('users/artists/' + toID).then(artist => {
      let reviewsArtist: { userID: string, rate: number, description: string, timestamp: number }[];

      if (!artist.reviewsReceived) reviewsArtist = [];
      else reviewsArtist = artist.reviewsReceived;

      reviewsArtist.push({
        userID: fromID,
        rate,
        description,
        timestamp: Date.now()
      });

      this.setDatabaseData('users/artists/' + toID, { reviewsReceived: reviewsArtist });
    });

    this.getDatabaseData('users/regular/' + fromID).then(user => {
      let reviewsUser: { artistID: string, rate: number, description: string, timestamp: number }[];

      if (!user.reviewsGiven) reviewsUser = [];
      else reviewsUser = user.reviewsGiven;

      reviewsUser.push({
        artistID: toID,
        rate,
        description,
        timestamp: Date.now()
      });

      this.setDatabaseData('users/regular/' + fromID, { reviewsGiven: reviewsUser });
    });
  }
}


