import { Component, OnInit } from '@angular/core';
import {User} from '../../../_domain/User';
import {Course} from '../../../_domain/Course';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-enrol',
  templateUrl: './enrol.component.html',
  styleUrls: ['./enrol.component.scss']
})
export class EnrolComponent implements OnInit {

  course: Course = {
    artistID: '',
    category: '',
    description: '',
    id: '',
    imagesURL: [],
    name: '',
    pitch: '',
    duration: '',
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
      this.course.id = params.cid;

      this.firebaseService.getCourseInfo(this.course.id).then(courseInfo => {
        this.course.name = courseInfo.name;
        this.course.category = courseInfo.category;
        this.course.pitch = courseInfo.pitch;
        this.course.description = courseInfo.description;
        this.course.duration = courseInfo.duration;
        if (courseInfo.list) this.course.list = courseInfo.list;
        this.course.price = courseInfo.price;
        this.course.imagesURL = courseInfo.imagesURL;
        if (courseInfo.rate) this.course.rate = courseInfo.rate;
        this.course.timesSold = courseInfo.timesSold;
        this.course.timestamp = courseInfo.timestamp;
        this.course.artistID = courseInfo.artistID;
        this.course.reviews = courseInfo.reviews;

        this.firebaseService.getUserInfo(this.course.artistID).then(artistInfo => {
          this.artist.name = artistInfo.name;
          this.artist.avatar = artistInfo.avatar;
          this.artist.title = artistInfo.title;
        });
      });

    });
  }

}
