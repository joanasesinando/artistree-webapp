import {Regular} from './Regular';
import firebase from 'firebase';

export class Booking{
  private _usersEnrolled: string[];
  constructor(private _title: string, private _creator: string, private _description: string,
              private _price: number, private _duration: number) {
  }


  get usersEnrolled(): string[] {
    return this._usersEnrolled;
  }

  set usersEnrolled(value: string[]) {
    this._usersEnrolled = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get creator(): string {
    return this._creator;
  }

  set creator(value: string) {
    this._creator = value;
  }

  get description(): string {
    return this._description;
  }

  set description(value: string) {
    this._description = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get duration(): number {
    return this._duration;
  }

  set duration(value: number) {
    this._duration = value;
  }

  enrollUser(_regular: Regular): void{
    console.log(this.usersEnrolled);
    this._usersEnrolled.push(_regular.Uid);
    firebase.database().ref('bookings/' + this._title).update({
      usersEnrolled: this._usersEnrolled
    });
  }
}
