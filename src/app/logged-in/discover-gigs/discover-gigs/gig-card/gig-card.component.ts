import {Component, Input, OnInit} from '@angular/core';
import {Gig} from '../../../../_domain/Gig';

@Component({
  selector: 'app-gig-card',
  templateUrl: './gig-card.component.html',
  styleUrls: ['./gig-card.component.scss']
})
export class GigCardComponent implements OnInit {

  @Input() gig: Gig;

  constructor() { }

  ngOnInit(): void {
  }

  formatText(max: number, text: string): string {
    if (text.length > max) return text.substr(0, max) + '...';
    return text;
  }


}
