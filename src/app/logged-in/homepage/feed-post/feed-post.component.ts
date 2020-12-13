import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import * as lightbox from 'lightbox2';

@Component({
  selector: 'app-feed-post',
  templateUrl: './feed-post.component.html',
  styleUrls: ['./feed-post.component.scss']
})
export class FeedPostComponent implements OnInit, AfterViewInit {

  @Input() feed: {
    avatar: string,
    name: string,
    title: string,
    timestamp: number
    description: string,
    likes: { liked: boolean, total: number },
    commentsTotal: number,
    imgsURL?: string[],
  };

  @Input() marginBottom: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    });
  }

  getTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

}
