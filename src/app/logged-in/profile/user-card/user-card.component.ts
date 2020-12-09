import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import {IUser} from '../../../_domain/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: IUser;

  form = {
    nameValid: true,
    titleValid: true,
  };

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
    if (!this.form.nameValid || !this.form.titleValid) return;

    // Update social links in user obj
    this.user.socialLinks = [];
    for (const key in this.socialLinks) {
      if (Object.prototype.hasOwnProperty.call(this.socialLinks, key)) {
        const link = this.socialLinks[key];
        if (link !== '') this.user.socialLinks.push({ network: key, link });
      }
    }

    // Update database
    if (this.user.type === 'artist') {
      this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
        name: this.user.name,
        title: this.user.title,
        location: this.user.location,
        socialLinks: this.user.socialLinks
      });

    } else if (this.user.type === 'regular') {
      this.firebaseService.setDatabaseData('users/regular/' + this.user.uid, {
        name: this.user.name,
        location: this.user.location,
        socialLinks: this.user.socialLinks
      });
    }
  }
}
