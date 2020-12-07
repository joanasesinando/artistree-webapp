import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

import firebase from 'firebase/app';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFireDatabase} from '@angular/fire/database';

import {AlertService} from '../../_util/alert.service';

import {Regular} from '../../_domain/Regular';
import {Artist} from '../../_domain/Artist';
import {Course} from '../../_domain/Course';
import {Booking} from '../../_domain/Booking';


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
              joiningTimestamp
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
    return this.getDatabaseData('users/artists/' + uid).then(user => user).catch(() => {
      this.getDatabaseData('users/regular/' + uid).then(user => user).catch(() => {
        console.log('User with ID ' + uid + ' does not exist');
        return null;
      });
    });
  }

  isArtist(uid: string): Promise<boolean> {
    return this.getUserInfo(uid).then(user => {
      return user.type === 'artist';
    });
  }




  async getRegularByID(_Uid: string): Promise<Regular> {
    let _email = '';
    let _name = '';
    let _surname = '';
    let _handler = '';
    let _areas = [];
    return firebase.database().ref('users/Regulars/' + _Uid).once('value').then ((snap) => {
      _email = snap.val().email;
      _name = snap.val().name;
      _surname = snap.val().surname;
      _handler = snap.val().handler;
      _areas = snap.val().areas;
      const r = new Regular(_Uid, _email, _name, _surname, _handler, _areas);
      if (snap.val().coursesEnrolled === undefined){
        r.coursesEnrolled = [];
      }else{
        r.coursesEnrolled = snap.val().coursesEnrolled;
      }
      if (snap.val().bookingsEnrolled === undefined){
        r.bookingsEnrolled = [];
      }else{
        r.bookingsEnrolled = snap.val().bookingsEnrolled;
      }
      if (snap.val().following === undefined){
        r.following = [];
      }else{
        r.following = snap.val().following;
      }
      return r;
    });
  }


async getArtistByID(_Uid: string): Promise<Artist> {
    let _email = '';
    let _name = '';
    let _surname = '';
    let _handler = '';
    let _areas = [];
    return firebase.database().ref('users/Artists/' + _Uid).once('value').then ((snap) => {
      _email = snap.val().email;
      _name = snap.val().name;
      _surname = snap.val().surname;
      _handler = snap.val().handler;
      _areas = snap.val().areas;
      const a = new Artist(_Uid, _email, _name, _surname, _handler, _areas);

      if (snap.val().coursesCreated === undefined){
        a.coursesCreated = [];
      }else{
        a.coursesCreated = snap.val().coursesCreated;
      }

      if (snap.val().bookingsCreated === undefined){
        a.bookingsCreated = [];
      }else{
        a.bookingsCreated = snap.val().bookingsCreated;
      }

      if (snap.val().followers === undefined){
        a.followers = [];
      }else{
        a.followers = snap.val().followers;
      }

      if (snap.val().following === undefined){
        a.following = [];
      }else{
        a.following = snap.val().following;
      }
      return a;
    });
  }

  async getCourseByName(_title: string): Promise<Course> {
    let _creator = '';
    let _description = '';
    let _price = 0;
    let _usersEnrolled = [];
    return firebase.database().ref('courses/' + _title).once('value').then ((snap) => {
      _creator = snap.val().creator;
      _description = snap.val().description;
      _price = snap.val().price;
      _usersEnrolled = snap.val().usersEnrolled;
      const c = new Course(_title, _creator, _price, _description);
      if (snap.val().usersEnrolled === undefined){
        c.usersEnrolled = [];
      }else{
        c.usersEnrolled = _usersEnrolled;
      }
      return c;
    });
  }


  async getBookingByName(_title: string): Promise<Booking> {
    let _creator = '';
    let _description = '';
    let _price = 0;
    let _duration = 0;
    let _usersEnrolled = [];
    return firebase.database().ref('bookings/' + _title).once('value').then((snap) => {
      _creator = snap.val().creator;
      _description = snap.val().description;
      _price = snap.val().price;
      _duration = snap.val().duration;
      _usersEnrolled = snap.val().usersEnrolled;
      const b = new Booking(_title, _creator, _description, _price, _duration);
      if (snap.val().usersEnrolled === undefined) {
        b.usersEnrolled = [];
      } else {
        b.usersEnrolled = _usersEnrolled;
      }
      return b;
    });
  }

  /*** --------------------------------------------- ***/
  /*** ------------------- Create ------------------ ***/
  /*** --------------------------------------------- ***/

  createCourse( _title: string, _price: number, _description: string): void {
    this.getArtistByID(firebase.auth().currentUser.uid).then((artist) => {
      artist.createCourse(_title, _price, _description);
    });
  }
  createBooking( _title: string, _description: string, _price: number, _duration: number): void {
    this.getArtistByID(firebase.auth().currentUser.uid).then((artist) => {
      artist.createBooking(_title,  _description, _price, _duration);
    });
  }

  /*** --------------------------------------------- ***/
  /*** ------------------- Enroll ------------------ ***/
  /*** --------------------------------------------- ***/

  enrollInCourse(_courseTitle: string): void {
    this.getCourseByName(_courseTitle).then((course) => {
      this.getArtistByID(course.creator).then((artist) => {
        const c = new Course(_courseTitle, artist.Uid, course.price, course.description);
        c.usersEnrolled = course.usersEnrolled;
        this.getRegularByID(firebase.auth().currentUser.uid).then((regular) => {
          regular.enrollInCourse(c); });
      });
    });
  }

  enrollInBooking(_bookingTitle: string): void {
    this.getBookingByName(_bookingTitle).then((booking) => {
      this.getArtistByID(booking.creator).then((artist) => {
        const b = new Booking(_bookingTitle, artist.Uid, booking.description, booking.price, booking.duration);
        b.usersEnrolled = booking.usersEnrolled;
        this.getRegularByID(firebase.auth().currentUser.uid).then((regular) => {
          regular.enrollInBooking(b); });
      });
    });
  }

  /*** --------------------------------------------- ***/
  /*** ------------------- Follow ------------------ ***/
  /*** --------------------------------------------- ***/

  followRegular(_artistID: string): void{
    this.getRegularByID(firebase.auth().currentUser.uid).then((regular) => {
      this.getArtistByID(_artistID).then((artist) => {

        regular.follow(artist);
      });
    });
  }

  followArtist(_artistID: string): void{
    this.getArtistByID(firebase.auth().currentUser.uid).then((artist) => {
      this.getArtistByID(_artistID).then((artist2) => {
        artist2.follow(artist);
      });
    });
  }

}
