import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-interests-card',
  templateUrl: './interests-card.component.html',
  styleUrls: ['./interests-card.component.scss']
})
export class InterestsCardComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: { uid: string, name: string, handler: string, avatar: string, following: number, followers?: number,
    location: string, joiningTimestamp: number, socialLinks: { network: string, link: string }[],
    reviewsGiven: { artistID: string, rate: number, description: string, timestamp: number }[],
    interests: string[], title?: string, artisticAreas?: string[], bio?: string, skills?: string[],
    highlights?: { title: string, description: string }[],
    reviewsReceived?: { artistID: string, rate: number, description: string, timestamp: number }[],
    portfolio?: string[], gigs?: any[], courses?: any[], type: string };

  @ViewChild('form', { static: false }) form: NgForm;

  constructor() { }

  ngOnInit(): void {
  }

  update(): void {

    // TODO
  }

}
