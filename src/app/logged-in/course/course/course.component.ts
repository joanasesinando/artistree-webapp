import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';
import {Course} from '../../../_domain/Course';

import * as eva from 'eva-icons';
import * as lightbox from 'lightbox2';
import _ from 'lodash';
import {User} from '../../../_domain/User';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, AfterViewInit {

  course: Course = {
    artistID: '',
    category: '',
    description: '',
    duration: '',
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

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
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

  getImagesWithoutMain(): string[] {
    const copy = _.cloneDeep(this.course.imagesURL);
    copy.splice(0, 1);
    return copy;
  }

}
