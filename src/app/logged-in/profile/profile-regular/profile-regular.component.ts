import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../_domain/User';

@Component({
  selector: 'app-profile-regular',
  templateUrl: './profile-regular.component.html',
  styleUrls: ['./profile-regular.component.scss']
})
export class ProfileRegularComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
