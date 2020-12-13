import {AfterViewInit, Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

import * as eva from 'eva-icons';
import {User} from '../../../_domain/User';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: User;

  @Input() label: string;
  @Input() marginRight: boolean;

  @Input() small: boolean;

  @Output() deleteClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

}
