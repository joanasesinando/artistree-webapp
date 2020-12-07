import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as eva from 'eva-icons';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, AfterViewInit {

  @Input() avatar: string;
  @Input() name: string;
  @Input() followers: number;
  @Input() following: number;
  @Input() handler: string;
  @Input() from: string;
  @Input() since: string;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

}
