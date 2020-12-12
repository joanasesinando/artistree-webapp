import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';
import {Gig} from '../../../_domain/Gig';

@Component({
  selector: 'app-gig',
  templateUrl: './gig.component.html',
  styleUrls: ['./gig.component.scss']
})
export class GigComponent implements OnInit {

  gig: Gig = {category: '', description: '', id: '', imagesURL: [], name: '', pitch: '', price: 0, timesSold: 0, timestamp: 0};

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.gig.id = params.gid;

      this.firebaseService.getGigInfo(this.gig.id).then(gigInfo => {
        this.gig.name = gigInfo.name;
        this.gig.category = gigInfo.category;
        this.gig.pitch = gigInfo.pitch;
        this.gig.description = gigInfo.description;
        if (this.gig.list) this.gig.list = gigInfo.list;
        this.gig.price = gigInfo.price;
        this.gig.imagesURL = gigInfo.imagesURL;
        if (this.gig.rate) this.gig.rate = gigInfo.rate;
        this.gig.timesSold = gigInfo.timesSold;
        this.gig.timestamp = gigInfo.timestamp;
      });
    });
  }

}
