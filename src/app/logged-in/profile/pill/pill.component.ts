import {AfterViewInit, Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

import * as eva from 'eva-icons';
import {IUser} from '../../../_domain/User';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: IUser;

  @Input() label: string;
  @Input() marginRight: boolean;

  @Output() deleteClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

}
