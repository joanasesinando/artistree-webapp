import {User} from './User';
import firebase from 'firebase';

export class Artist extends User {
  coursesCreated: string[];
  bookingsCreated: string[];
  followers: string[];
  following: string[];

  constructor(public _Uid: string, public _email: string, public _name: string,
              public _surname: string, public _handler: string, public _areas: string[]) {
    super(_Uid, _email, _name, _surname, _handler, _areas);
  }

  get Uid(): string {
    return this._Uid;
  }

  set Uid(value: string) {
    this._Uid = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get handler(): string {
    return this._handler;
  }

  set handler(value: string) {
    this._handler = value;
  }

  get areas(): string[] {
    return this._areas;
  }

  set areas(value: string[]) {
    this._areas = value;
  }

  beFollowed(_user: string): void {
    this.followers.push(_user);
    firebase.database().ref('users/Artists/' + this._Uid ).update({
      followers: this.followers
    });
  }

  follow(_artist: Artist): void{
    this.following.push(_artist.Uid);
    _artist.beFollowed(this._Uid);
    firebase.database().ref('users/Artists/' + this._Uid ).update({
      following: this.following
    });
  }

  createCourse(_title: string, _price: number, _description: string): void{
    firebase.database().ref('courses/' + _title).set({
      creator: this.Uid,
      description: _description,
      price: _price
    });
    this.coursesCreated.push(_title);
    firebase.database().ref('users/Artists/' + this._Uid ).update({
      coursesCreated: this.coursesCreated
    });
  }

  createBooking(_title: string, _description: string, _price: number, _duration: number): void{
    firebase.database().ref('bookings/' + _title).set({
      creator: this.Uid,
      description: _description,
      price: _price,
      duration: _duration
    });
    this.bookingsCreated.push(_title);
    firebase.database().ref('users/Artists/' + this._Uid ).update({
      bookingsCreated: this.bookingsCreated
    });
  }
}
