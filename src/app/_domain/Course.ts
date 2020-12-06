import {Artist} from './Artist';
import {User} from './User';
import firebase from 'firebase';
import {Regular} from './Regular';

export class Course{
  private _usersEnrolled: string[];
  constructor(private _title: string, private _creator: string, private _price: number, private _description: string) {
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

  get price(): number {
    return this._price;
  }
  set price(value: number) {
    this._price = value;
    firebase.database().ref('courses/' + this._title).update({
      price: this._price
    });
  }

  get usersEnrolled(): string[] {
    return this._usersEnrolled;
  }

  set usersEnrolled(value: string[]) {
    this._usersEnrolled = value;
  }

  get description(): string {
    return this._description;
  }


  set description(value: string) {
    this._description = value;
    firebase.database().ref('courses/' + this._title).update({
      description: this._description
    });
  }

  enrollUser(_regular: Regular): void{
    console.log(this.usersEnrolled);
    this._usersEnrolled.push(_regular.Uid);
    firebase.database().ref('courses/' + this._title).update({
      usersEnrolled: this._usersEnrolled
    });
  }
}
