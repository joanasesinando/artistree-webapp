import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import * as eva from 'eva-icons';
import {NgForm} from '@angular/forms';

import * as $ from 'jquery';
import 'node_modules/bootstrap/js/dist/modal';
import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: { uid: string, name: string, handler: string, avatar: string, following: number, followers?: number,
    location: string, joiningTimestamp: number, socialLinks: { network: string, link: string }[],
    reviewsGiven: { artistID: string, rate: number, description: string, timestamp: number }[],
    interests: string[], title?: string, artisticAreas?: string[], bio?: string, skills?: string[],
    highlights?: { title: string, description: string }[],
    reviewsReceived?: { artistID: string, rate: number, description: string, timestamp: number }[],
    portfolio?: string[], gigs?: any[], courses?: any[], type: string };


  @ViewChild('form', { static: false }) form: NgForm;

  socialLinks = {
    facebook: '',
    instagram: '',
    youtube: '',
    twitter: '',
  };

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.initializeSocialLinks();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  initializeSocialLinks(): void {
    for (const social of this.user.socialLinks) {
      switch (social.network) {
        case 'facebook':
          this.socialLinks.facebook = social.link;
          break;

        case 'instagram':
          this.socialLinks.instagram = social.link;
          break;

        case 'youtube':
          this.socialLinks.youtube = social.link;
          break;

        case 'twitter':
          this.socialLinks.twitter = social.link;
          break;
      }
    }
  }

  formatTimestamp(timestamp: number): string {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = new Date(timestamp);

    return months[date.getMonth()] + ' ' + date.getFullYear();
  }

  update(): void {

    // Update social links in user obj
    this.user.socialLinks = [];

    for (const key in this.socialLinks) {
      if (Object.prototype.hasOwnProperty.call(this.socialLinks, key)) {
        const link = this.socialLinks[key];
        if (link !== '') this.user.socialLinks.push({ network: key, link });
      }
    }

    console.log(this.user.socialLinks);
    console.log(this.socialLinks);

    if (this.user.type === 'artist') {


    } else if (this.user.type === 'regular') {
      this.firebaseService.setDatabaseData('users/regular/' + this.user.uid, {
        name: this.user.name,
        location: this.user.location,
        socialLinks: this.user.socialLinks
      });
    }
  }
}
