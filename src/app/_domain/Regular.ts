import {User} from './User';
import {Course} from './Course';
import firebase from 'firebase';
import {Booking} from './Booking';
import {Artist} from './Artist';

export class Regular extends User {
  coursesEnrolled: string[];
  bookingsEnrolled: string[];
  following: string[];

  constructor(public _Uid: string, public _email: string, public _name: string,
              public _surname: string, public _handler: string, public _areas: string[]) {
    super(_Uid, _email, _name, _surname, _handler, _areas);
  }


  get handler(): string {
    return this._handler;
  }

  set handler(value: string) {
    this._handler = value;
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

  get areas(): string[] {
    return this._areas;
  }

  set areas(value: string[]) {
    this._areas = value;
  }

  follow(_artist: Artist): void{

    this.following.push(_artist.Uid);
    firebase.database().ref('users/Regulars/' + this._Uid ).update({
      following: this.following
    });
    _artist.beFollowed(this._Uid);
  }

  enrollInCourse(_course: Course): void{
    this.coursesEnrolled.push(_course.title);
    firebase.database().ref('users/Regulars/' + this._Uid ).update({
     coursesEnrolled: this.coursesEnrolled
    });
    _course.enrollUser(this);
  }

  enrollInBooking(_booking: Booking): void{
    this.bookingsEnrolled.push(_booking.title);
    firebase.database().ref('users/Regulars/' + this._Uid ).update({
      bookingsEnrolled: this.bookingsEnrolled
    });
    _booking.enrollUser(this);
  }
}
