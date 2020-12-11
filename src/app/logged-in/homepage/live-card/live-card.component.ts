import {Component, Input, OnInit} from '@angular/core';
import {Live} from '../../../_domain/Live';
import {User} from '../../../_domain/User';
import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-live-card',
  templateUrl: './live-card.component.html',
  styleUrls: ['./live-card.component.scss']
})
export class LiveCardComponent implements OnInit {

  @Input() live: Live;

  artist: User = {handler: '', interests: [], joiningTimestamp: 0, name: '', type: '', uid: ''};

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.getArtist();
  }

  getArtist(): void {
    this.firebaseService.getDatabaseData('users/artists/' + this.live.artistID).then(artist => {
      this.artist = artist as User;
    });
  }

  formatText(max: number, text: string): string {
    if (text.length > max) return text.substr(0, max) + '...';
    return text;
  }

}
