import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_domain/User';
import {Course} from '../../../_domain/Course';
import {FirebaseService} from '../../../_services/firebase.service';

const categories = require('src/assets/data/categories.json').categories;

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.scss']
})
export class CoursesCardComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: User;

  newCourse: Course = {
    timestamp: null,
    timesSold: 0,
    category: '',
    duration: '',
    id: '',
    list: [],
    pitch: '',
    name: '',
    description: '',
    price: null,
    imagesURL: []
  };

  newPrice: string;

  newListItem1: string;
  newListItem2: string;
  newListItem3: string;
  newListItem4: string;
  newListItem5: string;
  newListItem6: string;

  newPhoto1: string;
  newPhoto2: string;
  newPhoto3: string;
  newPhoto4: string;
  newPhoto5: string;
  newPhoto6: string;

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    focusOnSelect: false,
    arrows: true,
    nextArrow: '<div *ngIf="this.user.gigs.length > 1" class="carousel-control-next"><div class="icon-wrapper"><i data-eva="arrow-forward-outline"></i></div></div>',
    prevArrow: '<div *ngIf="this.user.gigs.length > 1" class="carousel-control-prev"><div class="icon-wrapper"><i data-eva="arrow-back-outline"></i></div></div>',
    dots: false,
    fade: false,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 900,
        settings: {
          mobileFirst: true,
          slidesToShow: 1,
          arrows: true,
          lazyload: 'ondemand',
        }
      }
    ]
  };

  categories = categories;
  durations = [
    '1 week', '2 weeks', '3 weeks', '4 weeks',
    '1 month', '2 months', '3 months', '4 months', '5 months', '6 months', '7 months', '8 months', '9 months', '10 months', '11 months',
    '1 year'
  ];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  getNewID(): string {
    let max = -1;
    if (this.user.courses.length === 0) return '0';

    for (const course of this.user.courses) {
      if (max < parseInt(course.id, 10)) max = parseInt(course.id, 10);
    }
    return (max + 1).toString();
  }

  createCourse(): void {
    this.newCourse.price = parseFloat(this.newPrice);

    if (this.newListItem1 && this.newListItem1 !== '') this.newCourse.list.push(this.newListItem1);
    if (this.newListItem2 && this.newListItem2 !== '') this.newCourse.list.push(this.newListItem2);
    if (this.newListItem3 && this.newListItem3 !== '') this.newCourse.list.push(this.newListItem3);
    if (this.newListItem4 && this.newListItem4 !== '') this.newCourse.list.push(this.newListItem4);
    if (this.newListItem5 && this.newListItem5 !== '') this.newCourse.list.push(this.newListItem5);
    if (this.newListItem6 && this.newListItem6 !== '') this.newCourse.list.push(this.newListItem6);

    this.newCourse.imagesURL.push(this.newPhoto1);
    if (this.newPhoto2 && this.newPhoto2 !== '') this.newCourse.imagesURL.push(this.newPhoto2);
    if (this.newPhoto3 && this.newPhoto3 !== '') this.newCourse.imagesURL.push(this.newPhoto3);
    if (this.newPhoto4 && this.newPhoto4 !== '') this.newCourse.imagesURL.push(this.newPhoto4);
    if (this.newPhoto5 && this.newPhoto5 !== '') this.newCourse.imagesURL.push(this.newPhoto5);
    if (this.newPhoto6 && this.newPhoto6 !== '') this.newCourse.imagesURL.push(this.newPhoto6);

    const courseID = this.getNewID();
    this.user.courses.push({
      id: courseID,
      name: this.newCourse.name,
      category: this.newCourse.category,
      pitch: this.newCourse.pitch,
      description: this.newCourse.description,
      duration: this.newCourse.duration,
      list: this.newCourse.list.length !== 0 ? this.newCourse.list : [],
      price: this.newCourse.price,
      imagesURL: this.newCourse.imagesURL,
      timesSold: 0,
      timestamp: Date.now()
    });

    this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
      courses: this.user.courses
    });

    this.firebaseService.setDatabaseData('courses/' + courseID, this.newCourse);

    this.newCourse = {
      timestamp: 0,
      timesSold: 0,
      category: '', duration: '', id: '', list: [], pitch: '', name: '', description: '', price: null, imagesURL: [] };

    this.newPrice = '';

    this.newListItem1 = '';
    this.newListItem2 = '';
    this.newListItem3 = '';
    this.newListItem4 = '';
    this.newListItem5 = '';
    this.newListItem6 = '';

    this.newPhoto1 = '';
    this.newPhoto2 = '';
    this.newPhoto3 = '';
    this.newPhoto4 = '';
    this.newPhoto5 = '';
    this.newPhoto6 = '';
  }

  deleteCourse(courseToDelete: Course): void {
    for (let i = 0; i < this.user.courses.length; i++) {
      const course = this.user.courses[i];

      if (course.id === courseToDelete.id) {
        this.user.courses.splice(i, 1);
        this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
          courses: this.user.courses
        });
      }
    }

    this.firebaseService.setDatabaseData('courses/' + courseToDelete.id, {
      id: null,
      name: null,
      category: null,
      pitch: null,
      description: null,
      duration: null,
      list: [],
      price: null,
      imagesURL: [],
      rate: null,
      timesSold: null,
      timestamp: null
    });
  }

}
