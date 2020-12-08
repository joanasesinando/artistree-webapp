import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import * as eva from 'eva-icons';
import {FirebaseService} from '../../../_services/firebase.service';
const categories = require('src/assets/data/categories.json').categories;

@Component({
  selector: 'app-interests-card',
  templateUrl: './interests-card.component.html',
  styleUrls: ['./interests-card.component.scss']
})
export class InterestsCardComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: { uid: string, name: string, handler: string, avatar: string, following: number, followers?: number,
    location: string, joiningTimestamp: number, socialLinks: { network: string, link: string }[],
    reviewsGiven: { artistID: string, rate: number, description: string, timestamp: number }[],
    interests: string[], title?: string, artisticAreas?: string[], bio?: string, skills?: string[],
    highlights?: { title: string, description: string }[],
    reviewsReceived?: { artistID: string, rate: number, description: string, timestamp: number }[],
    portfolio?: string[], gigs?: any[], courses?: any[], type: string };

  newInterest: string;
  newArtisticArea: string;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  getOptions(type: string): string[] {
    switch (type) {
      case 'interests':
        const options: string[] = [];
        for (const category of categories) {
          if (!this.user.interests.includes(category))
            options.push(category);
        }
        return options;

      case 'artistic-areas':
        const areas: string[] = [];
        for (const category of categories) {
          if (!this.user.artisticAreas.includes(category))
            areas.push(category);
        }
        return areas;

    }
  }

  deleteInterest(interestToDelete: string): void {
    const interests: string[] = [];

    for (const interest of this.user.interests) {
      if (interest !== interestToDelete)
        interests.push(interest);
    }
    this.user.interests = interests;

    // Update database
    if (this.user.type === 'artist') {
      this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, { interests });

    } else if (this.user.type === 'regular') {
      this.firebaseService.setDatabaseData('users/regular/' + this.user.uid, { interests });
    }
  }

  deleteArtisticArea(areaToDelete: string): void {
    const areas: string[] = [];

    for (const area of this.user.artisticAreas) {
      if (area !== areaToDelete)
        areas.push(area);
    }
    this.user.artisticAreas = areas;

    // Update database
    if (this.user.type === 'artist') {
      this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
        artisticAreas: areas
      });

    } else if (this.user.type === 'regular') {
      this.firebaseService.setDatabaseData('users/regular/' + this.user.uid, {
        artisticAreas: areas
      });
    }
  }

  updateInterests(): void {
    if (this.newInterest !== '-1' && this.newInterest !== '') {
      this.user.interests.push(this.newInterest);

      // Update database
      if (this.user.type === 'artist') {
        this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
          interests: this.user.interests
        });

      } else if (this.user.type === 'regular') {
        this.firebaseService.setDatabaseData('users/regular/' + this.user.uid, {
          interests: this.user.interests
        });
      }

      this.newInterest = '';
    }
  }

  updateArtisticAreas(): void {
    if (this.newArtisticArea !== '-1' && this.newArtisticArea !== '') {
      this.user.artisticAreas.push(this.newArtisticArea);

      // Update database
      if (this.user.type === 'artist') {
        this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
          artisticAreas: this.user.artisticAreas
        });

      } else if (this.user.type === 'regular') {
        this.firebaseService.setDatabaseData('users/regular/' + this.user.uid, {
          artisticAreas: this.user.artisticAreas
        });
      }

      this.newArtisticArea = '';
    }
  }

}
