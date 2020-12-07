import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {

  @Input() reviews: {name: string, avatar: string, review: string, when: string, rate: number}[];

  constructor() { }

  ngOnInit(): void {
  }

}
