import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';
import {Gig} from '../../../_domain/Gig';
import {User} from '../../../_domain/User';

import * as eva from 'eva-icons';
import * as lightbox from 'lightbox2';
import _ from 'lodash';

@Component({
  selector: 'app-gig',
  templateUrl: './gig.component.html',
  styleUrls: ['./gig.component.scss']
})
export class GigComponent implements OnInit, AfterViewInit {

  // tslint:disable-next-line:max-line-length
  gig: Gig = {list: null, reviews: null, rate: 0, artistID: '', category: '', description: '', id: '', imagesURL: [], name: '', pitch: '', price: 0, timesSold: 0, timestamp: 0};

  artist: User = {title: '', avatar: '', handler: '', interests: [], joiningTimestamp: 0, name: '', type: '', uid: ''};

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.gig.id = params.gid;

      this.firebaseService.getGigInfo(this.gig.id).then(gigInfo => {
        this.gig.name = gigInfo.name;
        this.gig.category = gigInfo.category;
        this.gig.pitch = gigInfo.pitch;
        this.gig.description = gigInfo.description;
        if (gigInfo.list) this.gig.list = gigInfo.list;
        this.gig.price = gigInfo.price;
        this.gig.imagesURL = gigInfo.imagesURL;
        if (gigInfo.rate) this.gig.rate = gigInfo.rate;
        this.gig.timesSold = gigInfo.timesSold;
        this.gig.timestamp = gigInfo.timestamp;
        this.gig.artistID = gigInfo.artistID;
        this.gig.reviews = gigInfo.reviews;

        this.firebaseService.getUserInfo(this.gig.artistID).then(artistInfo => {
          this.artist.name = artistInfo.name;
          this.artist.avatar = artistInfo.avatar;
          this.artist.title = artistInfo.title;
        });
      });
    });
  }

  ngAfterViewInit(): void {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    });
  }

  getRateArray(rate: number): any[] {
    const rateArray: boolean[] = [];
    for (let i = 0; i < rate; i++) {
      rateArray.push(true);
    }
    eva.replace();
    return rateArray;
  }

  getImagesWithoutMain(): void {
    const copy = _.cloneDeep(this.gig.imagesURL);
    copy.splice(0, 1);
    return copy;
  }

}
