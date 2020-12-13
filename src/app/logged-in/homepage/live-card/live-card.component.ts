import {Component, Input, OnInit} from '@angular/core';
import {Live} from '../../../_domain/Live';
import {FirebaseService} from '../../../_services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-live-card',
  templateUrl: './live-card.component.html',
  styleUrls: ['./live-card.component.scss']
})
export class LiveCardComponent implements OnInit {

  @Input() live: Live;

  constructor(private firebaseService: FirebaseService, private router: Router) {
  }

  ngOnInit(): void {
  }

  formatText(max: number, text: string): string {
    if (text && text.length > max) return text.substr(0, max) + '...';
    return text;
  }

  goToLive(): void {
    this.router.navigate(['/streaming/' + this.live.id]);
  }
}
