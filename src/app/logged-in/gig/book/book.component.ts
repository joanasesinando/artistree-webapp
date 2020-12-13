import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Gig} from '../../../_domain/Gig';
import {User} from '../../../_domain/User';
import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit, AfterViewInit {

  gig: Gig = {
    artistID: '',
    category: '',
    description: '',
    id: '',
    imagesURL: [],
    name: '',
    pitch: '',
    price: 0,
    timesSold: 0,
    timestamp: 0,
    list: null,
    reviews: null,
    rate: 0
  };

  artist: User = {title: '', avatar: '', handler: '', interests: [], joiningTimestamp: 0, name: '', type: '', uid: ''};

  paymentInfo = {
    cardNumber: null,
    expirationDate: null,
    securityCode: null,
    firstName: null,
    lastName: null,
  };

  options = {
    visa: true,
    mastercard: false,
    paypal: false
  };

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.parent.params.subscribe(params => {
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
    eva.replace();
  }

}
