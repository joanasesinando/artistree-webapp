import {Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../_domain/User';

@Component({
  selector: 'app-profile-artist',
  templateUrl: './profile-artist.component.html',
  styleUrls: ['./profile-artist.component.scss']
})
export class ProfileArtistComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: IUser;

  constructor() { }

  ngOnInit(): void {
  }

}
