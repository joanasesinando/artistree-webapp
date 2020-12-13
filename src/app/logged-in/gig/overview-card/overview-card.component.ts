import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Gig} from '../../../_domain/Gig';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit, AfterViewInit {

  @Input() gig: Gig;
  @Input() marginTop: boolean;
  @Input() marginTopOnMobile: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

}
