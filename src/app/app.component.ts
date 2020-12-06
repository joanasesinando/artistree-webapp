import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';

import * as eva from 'eva-icons';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'artistree-webapp';

  // tslint:disable-next-line:variable-name
  constructor(public _router: Router) {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  // FIXME: move
  // createRegular(username: string, name: string, surname: string): void{
  //   this.auth.createRegular(username, name, surname, ['Dance', 'Music', 'Magic']);
  // }
}
