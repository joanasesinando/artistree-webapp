import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../../../_domain/User';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  @Input() artist: User;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProfile(): void {
    this.router.navigate(['/profile', this.artist.uid]);
  }

}
