import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FirebaseService} from '../../../_services/firebase.service';
import {Course} from '../../../_domain/Course';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

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
    timestamp: 0
  };

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
        if (this.course.list) this.course.list = courseInfo.list;
        this.course.price = courseInfo.price;
        this.course.imagesURL = courseInfo.imagesURL;
        if (this.course.rate) this.course.rate = courseInfo.rate;
        this.course.timesSold = courseInfo.timesSold;
        this.course.timestamp = courseInfo.timestamp;
      });
    });
  }

}
