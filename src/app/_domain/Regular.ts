import {User} from './User';

export class Regular extends User {
  constructor(public _Uid: string, public _email: string, public _name: string,
              public _surname: string, public _handler: string, public _areas: string[]) {
    super(_Uid, _email, _name, _surname, _handler, _areas);
  }
}
