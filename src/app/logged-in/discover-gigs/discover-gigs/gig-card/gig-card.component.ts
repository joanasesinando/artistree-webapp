import {Component, Input, OnInit} from '@angular/core';
import {Gig} from '../../../../_domain/Gig';
import {Router} from '@angular/router';

@Component({
  selector: 'app-gig-card',
  templateUrl: './gig-card.component.html',
  styleUrls: ['./gig-card.component.scss']
})
export class GigCardComponent implements OnInit {

  @Input() gig: Gig;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  formatText(max: number, text: string): string {
    if (text.length > max) return text.substr(0, max) + '...';
    return text;
  }

  goToGig(): void {
    this.router.navigate(['/gig', this.gig.id]);
  }

  goToBooking(): void {
    this.router.navigate(['/gig/' + this.gig.id + '/book']);
  }

}
