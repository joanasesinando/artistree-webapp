import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import firebase from 'firebase/app';
import {AngularFireDatabase} from '@angular/fire/database';
import {Regular} from '../../_domain/Regular';
import {AlertService} from '../../_util/alert.service';
import {Router} from '@angular/router';
import {Artist} from '../../_domain/Artist';
import {Course} from '../../_domain/Course';
import {Booking} from '../../_domain/Booking';


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

  signup(email: string, password: string, firstName: string, lastName: string, handler: string,
         areas: string[], type: string): Promise<boolean> {

    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {

        switch (type) {
          case 'artist':
            return this.writeArtistData(handler, firstName, lastName, areas)
              .then(() => {
                this.alertService.showAlert('Thanks for joining!', 'You are now part of Artistree. We hope you feel inspired.', 'success');
                return true;
              })
              .catch(err => {
                this.alertService.showAlert('Something went wrong...', err.message, 'danger');
                return false;
              });

          case 'user':
          default:
            return this.writeRegularData(handler, firstName, lastName, areas)
              .then(() => {
                this.alertService.showAlert('Thanks for joining!', 'You are now part of Artistree. We hope you feel inspired.', 'success');
                return true;
              })
              .catch(err => {
                this.alertService.showAlert('Something went wrong...', err.message, 'danger');
                return false;
              });
        }

      });
  }

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
  /*** -------- General Database Functions --------- ***/
  /*** --------------------------------------------- ***/

  public getDatabaseData(path): Promise<any> {
    return firebase.database().ref(path).once('value').then(snapshot => snapshot.val());
  }

  public setDatabaseData(path, data): Promise<boolean> {
    return firebase.database().ref(path).update(data).then(() => true).catch(() => false);
  }

  /*** --------------------------------------------- ***/
  /*** ------------------- Exists ------------------ ***/
  /*** --------------------------------------------- ***/

  emailAlreadyExists(other: string): Promise<boolean> {
    return this.getAllEmails().then(emails => {
      for (const email of emails) {
        if (email === other) {
          return true;
        }
      }
      return false;
    });
  }

  handlerAlreadyExists(other: string): Promise<boolean> {
    return this.getAllHandlers().then(handlers => {
      for (const handler of handlers) {
        if (handler === other) {
          return true;
        }
      }
      return false;
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
  /*** -------------------- Write ------------------ ***/
  /*** --------------------------------------------- ***/

  writeRegularData(handler: string, firstname: string, lastName: string, areas: string[]): Promise<boolean> {
    return this.setDatabaseData('users/Regulars/' + firebase.auth().currentUser.uid, {
      handler,
      name: firstname,
      surname: lastName,
      email: firebase.auth().currentUser.email,
      areas
    });
  }

  writeArtistData(handler: string, firstname: string, lastName: string, areas: string[]): Promise<boolean> {
    return this.setDatabaseData('users/Artists/' + firebase.auth().currentUser.uid, {
      handler,
      name: firstname,
      surname: lastName,
      email: firebase.auth().currentUser.email,
      areas
    });
  }

  /*** --------------------------------------------- ***/
  /*** -------------------- Get -------------------- ***/
  /*** --------------------------------------------- ***/

  getAllHandlers(): Promise<string[]> {
    const handlers: string[] = [];

    return this.getDatabaseData('users').then(users => {

      for (const key in users.Artists) {
        if (Object.prototype.hasOwnProperty.call(users.Artists, key)) {
          const user = users.Artists[key];
          handlers.push(user.handler);
        }
      }

      for (const key in users.Regulars) {
        if (Object.prototype.hasOwnProperty.call(users.Regulars, key)) {
          const user = users.Regulars[key];
          handlers.push(user.handler);
        }
      }

      return handlers;
    });
  }

  getAllEmails(): Promise<string[]> {
    const emails: string[] = [];

    return this.getDatabaseData('users').then(users => {

      for (const key in users.Artists) {
        if (Object.prototype.hasOwnProperty.call(users.Artists, key)) {
          const user = users.Artists[key];
          emails.push(user.email);
        }
      }

      for (const key in users.Regulars) {
        if (Object.prototype.hasOwnProperty.call(users.Regulars, key)) {
          const user = users.Regulars[key];
          emails.push(user.email);
        }
      }

      return emails;
    });
  }

  getUserFullName(uid: string): void {

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
