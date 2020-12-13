import {Component, Input, OnInit} from '@angular/core';
import {Gig} from '../../../_domain/Gig';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit {

  @Input() gig: Gig;

  constructor() { }

  ngOnInit(): void {
  }

}
