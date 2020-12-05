export class User{
  constructor(public _Uid: string, public _email: string, public _name: string,
              public _surname: string, public _handler: string, public _areas: string[]) {
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
}
