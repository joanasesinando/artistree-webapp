import {Component, Input, OnInit} from '@angular/core';

import {IUser} from '../../../_domain/User';
import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';

@Component({
  selector: 'app-reviews-card',
  templateUrl: './reviews-card.component.html',
  styleUrls: ['./reviews-card.component.scss']
})
export class ReviewsCardComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: IUser;
  @Input() type: string;
  @Input() marginTop: boolean;
  @Input() marginTopOnMobile: boolean;

  sortItems: string[] = ['Most recent', 'Oldest', 'Highest score', 'Lowest score'];

  reviewsToShow: { avatar: string, name: string, rate: number, description: string, timestamp: number }[] = [];
  reviewsAfterSplit: { avatar: string, name: string, rate: number, description: string, timestamp: number }[] = [];

  numberReviewsShowing = 3;
  currentSorting = this.sortItems[0];

  constructor(private firebaseService: FirebaseService) { }

  async ngOnInit(): Promise<void> {
    await this.loadReviews();
    this.doSort(this.currentSorting);
  }

  async loadReviews(): Promise<void> {
    if (this.type === 'given') {

      for (const review of this.user.reviewsGiven) {
        await this.firebaseService.getUserInfo(review.artistID).then(artist => {
          this.reviewsToShow.push({
            avatar: artist.avatar,
            name: artist.name,
            rate: review.rate,
            description: review.description,
            timestamp: review.timestamp
          });
        });
      }

    } else if (this.type === 'received') {

      for (const review of this.user.reviewsReceived) {
        await this.firebaseService.getUserInfo(review.userID).then(reviewer => {
          this.reviewsToShow.push({
            avatar: reviewer.avatar,
            name: reviewer.name,
            rate: review.rate,
            description: review.description,
            timestamp: review.timestamp
          });
        });
      }
    }
  }

  getRateArray(rate: number): any[] {
    const rateArray: boolean[] = [];
    for (let i = 0; i < rate; i++) {
      rateArray.push(true);
    }
    eva.replace();
    return rateArray;
  }

  getTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

  doSort(type: string): void {
    this.currentSorting = type;
    switch (type){
      case 'Most recent':
        this.reviewsToShow.sort((a, b) => b.timestamp - a.timestamp);
        break;

      case 'Oldest':
        this.reviewsToShow.sort((a, b) => a.timestamp - b.timestamp);
        break;

      case 'Highest score':
        this.reviewsToShow.sort((a, b) => b.rate - a.rate);
        break;

      case 'Lowest score':
        this.reviewsToShow.sort((a, b) => a.rate - b.rate);
        break;
    }

    this.reviewsAfterSplit = _.cloneDeep(this.reviewsToShow);
    this.splitReviews(this.numberReviewsShowing, this.reviewsAfterSplit);
  }

  splitReviews(max: number, reviews): void {
    reviews.splice(max, reviews.length - max);
  }

  loadMoreReviews(): void {
    this.numberReviewsShowing += 5;
    this.reviewsAfterSplit = _.cloneDeep(this.reviewsToShow);
    this.splitReviews(this.numberReviewsShowing, this.reviewsAfterSplit);
  }

}
