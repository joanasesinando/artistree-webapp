import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: { uid: string, name: string, handler: string, avatar: string, following: number, followers?: number,
          location: string, joiningTimestamp: number, socialLinks: { network: string, link: string }[],
          reviewsGiven: { artistID: string, rate: number, description: string, timestamp: number }[],
          interests: string[], title?: string, artisticAreas?: string[], bio?: string, skills?: string[],
          highlights?: { title: string, description: string }[],
          reviewsReceived?: { artistID: string, rate: number, description: string, timestamp: number }[],
          portfolio?: string[], gigs?: any[], courses?: any[], type: string } = {

    uid: '',
    name: '',
    handler: '',
    avatar: '',
    following: 0,
    followers: 0,
    location: '',
    joiningTimestamp: null,
    socialLinks: [],
    reviewsGiven: [],
    reviewsReceived: [],
    interests: [],
    title: '',
    artisticAreas: [],
    bio: '',
    skills: [],
    highlights: [],
    portfolio: [],
    gigs: [],
    courses: [],
    type: ''
  };

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.user.uid = params.uid;

      this.firebaseService.getUserInfo(this.user.uid).then(userInfo => {
        this.user.type = userInfo.type;
        this.user.name = userInfo.name;
        this.user.handler = userInfo.handler;
        this.user.avatar = userInfo.avatar;
        this.user.interests = userInfo.interests;
        this.user.joiningTimestamp = userInfo.joiningTimestamp;

        if (userInfo.following) this.user.following = userInfo.following.length;
        if (userInfo.followers) this.user.followers = userInfo.followers.length;

        if (userInfo.title) this.user.title = userInfo.title;
        if (userInfo.location) this.user.location = userInfo.location;
        if (userInfo.socialLinks) this.user.socialLinks = userInfo.socialLinks;

        if (userInfo.artisticAreas) this.user.artisticAreas = userInfo.artisticAreas;
        if (userInfo.bio) this.user.bio = userInfo.bio;
        if (userInfo.skills) this.user.skills = userInfo.skills;
        if (userInfo.highlights) this.user.highlights = userInfo.highlights;

        if (userInfo.portfolio) this.user.portfolio = userInfo.portfolio;
        if (userInfo.gigs) this.user.gigs = userInfo.gigs;
        if (userInfo.courses) this.user.courses = userInfo.courses;

        if (userInfo.reviewsGiven) this.user.reviewsGiven = userInfo.reviewsGiven;
        if (userInfo.reviewsReceived) this.user.reviewsReceived = userInfo.reviewsReceived;
      });
    });
  }

  isCurrentUser(): boolean {
    return this.user.uid === this.firebaseService.currentUser.uid;
  }

}
