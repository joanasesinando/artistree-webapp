import {Component, Input, OnInit} from '@angular/core';
import {IGig} from '../discover-gigs.component';

@Component({
  selector: 'app-gig-card',
  templateUrl: './gig-card.component.html',
  styleUrls: ['./gig-card.component.scss']
})
export class GigCardComponent implements OnInit {

  @Input() gig: IGig;

  constructor() { }

  ngOnInit(): void {
  }

}
