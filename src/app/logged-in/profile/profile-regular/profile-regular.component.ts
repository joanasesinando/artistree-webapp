import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-regular',
  templateUrl: './profile-regular.component.html',
  styleUrls: ['./profile-regular.component.scss']
})
export class ProfileRegularComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: { uid: string, name: string, handler: string, avatar: string, following: number, followers?: number,
    location: string, joiningTimestamp: number, socialLinks: { network: string, link: string }[],
    reviewsGiven: { artistID: string, rate: number, description: string, timestamp: number }[],
    interests: string[], title?: string, artisticAreas?: string[], bio?: string, skills?: string[],
    highlights?: { title: string, description: string }[],
    reviewsReceived?: { artistID: string, rate: number, description: string, timestamp: number }[],
    portfolio?: string[], gigs?: any[], courses?: any[], type: string };

  constructor() { }

  ngOnInit(): void {
    console.log(this.user);
  }

}
