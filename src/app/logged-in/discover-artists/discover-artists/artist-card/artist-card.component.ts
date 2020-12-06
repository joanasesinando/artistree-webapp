import {Component, Input, OnInit} from '@angular/core';
import {IArtist} from '../discover-artists.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  @Input() artist: IArtist;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToProfile(): void {
    this.router.navigate(['/profile', this.artist.uid]);
  }

}
