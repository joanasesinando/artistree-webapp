import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {FirebaseService} from '../../../_services/firebase.service';
import {IUser} from '../../../_domain/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: IUser = {
    artisticAreas: [],
    avatar: '',
    balance: 0,
    bio: '',
    courses: [],
    followers: 0,
    following: 0,
    gigs: [],
    handler: '',
    highlights: [],
    interests: [],
    joiningTimestamp: 0,
    location: '',
    moneyEarned: 0,
    name: '',
    popularity: 0,
    portfolio: [],
    relevance: 0,
    reviewsGiven: [],
    reviewsReceived: [],
    schedule: undefined,
    skills: [],
    socialLinks: [],
    title: '',
    type: '',
    uid: ''
  };

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.user.uid = params.uid;

      this.firebaseService.getUserInfo(this.user.uid).then(userInfo => {
        this.user.type = userInfo.type;
        this.user.name = userInfo.name;
        this.user.handler = userInfo.handler;
        this.user.interests = userInfo.interests;
        this.user.joiningTimestamp = userInfo.joiningTimestamp;
        if (userInfo.avatar) this.user.avatar = userInfo.avatar;

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
        if (userInfo.schedule) this.user.schedule = userInfo.schedule;

        if (userInfo.reviewsGiven) this.user.reviewsGiven = userInfo.reviewsGiven;
        if (userInfo.reviewsReceived) this.user.reviewsReceived = userInfo.reviewsReceived;

        if (userInfo.balance) this.user.balance = userInfo.balance;
        if (userInfo.moneyEarned) this.user.moneyEarned = userInfo.moneyEarned;

        if (userInfo.relevance) this.user.relevance = userInfo.relevance;
        if (userInfo.popularity) this.user.popularity = userInfo.popularity;
      });
    });
  }

  isCurrentUser(): boolean {
    return this.user.uid === this.firebaseService.currentUser.uid;
  }

}
