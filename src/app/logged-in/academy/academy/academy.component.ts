import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';
import {Course} from '../../../_domain/Course';
import {User} from '../../../_domain/User';


const CATEGORY_DEFAULT = 'All Categories';

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss']
})
export class AcademyComponent implements OnInit, AfterViewInit {

  currentUser: User = {handler: '', joiningTimestamp: 0, name: '', type: '', uid: '', interests: [], location: ''};

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  coursesList: Course[] = [];
  coursesToShow: Course[] = [];
  coursesAfterSplit: Course[] = [];

  categoryFilters: { name: string, total: number }[] = [];
  selectedCategory = CATEGORY_DEFAULT;

  selectedFilters: {name: string, type: string}[] = [];
  sortItems: string[] = ['Rate', 'Popularity', 'Best matching', 'Newest'];

  numberCoursesShowing = 20;
  currentSorting = this.sortItems[0];
  loading = true;

  constructor(private firebaseService: FirebaseService) {
    firebaseService.auth.onAuthStateChanged(user => {
      this.firebaseService.getUserInfo(user.uid).then(userInfo => {
        this.currentUser.interests = userInfo.interests;
        if (userInfo.location) this.currentUser.location = userInfo.location;
      });
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  loadCourses(): void {
    this.getAllCourses().then(() => {
      this.filterCourses();
      this.loading = false;
    });
  }

  getAllCourses(): Promise<void> {
    return this.firebaseService.getDatabaseData('courses').then(courses => {
      for (const key in courses) {
        if (Object.prototype.hasOwnProperty.call(courses, key)) {
          const course = courses[key] as Course;
          this.coursesList.push(course);
        }
      }
    });
  }

  splitCourses(max: number, courses: Course[]): void {
    courses.splice(max, courses.length - max);
  }

  loadMoreCourses(): void {
    this.numberCoursesShowing += 20;
    this.coursesAfterSplit = _.cloneDeep(this.coursesToShow);
    this.splitCourses(this.numberCoursesShowing, this.coursesAfterSplit);
  }

  doSearch(): void {
    this.selectFilter(this.search, 'search');
  }

  doSort(type: string): void {
    this.currentSorting = type;
    switch (type) {
      case 'Rate':
        this.coursesToShow.sort((a, b) => b.rate - a.rate);
        this.coursesAfterSplit = _.cloneDeep(this.coursesToShow);
        this.splitCourses(this.numberCoursesShowing, this.coursesAfterSplit);
        break;

      case 'Popularity': // TODO
        // this.artistsToShow.sort((a, b) => b.popularity - a.popularity);
        // this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        // this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
        break;

      case 'Best matching': // TODO
        // this.artistsToShow.sort((a, b) => {
        //   const aScore = this.getInterestsMatchingScore(a);
        //   const bScore = this.getInterestsMatchingScore(b);
        //
        //   if (bScore - aScore === 0)
        //     return this.getLocationMatchingScore(b) - this.getLocationMatchingScore(a);
        //   return bScore - aScore;
        // });
        // this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        // this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
        break;

      case 'Newest': // TODO
        // this.artistsToShow.sort((a, b) => a.joiningTimestamp - b.joiningTimestamp);
        // this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        // this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
        break;
    }
  }

  parseForSearching(query: string): string[] {
    let res: string[];
    let temp: string;

    res = query.toLowerCase().split(' ');

    temp = query.replace(' ', '').toLowerCase();
    if (!res.includes(temp)) res.push(temp);

    temp = query.toLowerCase();
    if (!res.includes(temp)) res.push(temp);
    return res;
  }

  parseForSearchingList(queries: string[]): string[] {
    let res: string[] = [];
    for (const query of queries) {
      res = res.concat(this.parseForSearching(query));
    }
    return res;
  }

  isQueryTrueSearch(course: Course): boolean {
    return !this.search ||
      !!this.parseForSearching(course.name).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(course.pitch).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(course.description).find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (course.list && !!this.parseForSearchingList(course.list).find(a => a.includes(this.search.toLowerCase())));
  }

  filterCourses(): void {
    this.coursesToShow = [];
    for (const course of this.coursesList) {
      if (this.isQueryTrueSearch(course))
        this.coursesToShow.push(course);
    }

    this.doSort(this.currentSorting);

    // this.getFiltersByCategory();
    // this.getFiltersByLocation();
  }

  selectFilter(filter: string, type: string): void {
    // tslint:disable-next-line:prefer-const
    let index;

    switch (type) {
      case 'category': // TODO
        // index = this.getFilterIndex(this.selectedCategory, this.selectedFilters, type);
        // if (index !== -1) // one already selected
        //   this.selectedFilters.splice(index, 1);
        //
        // if (filter !== CATEGORY_DEFAULT)
        //   this.selectedFilters.push({ name: filter, type });
        //
        // this.selectedCategory = filter;
        // this.filterArtists();
        break;

      case 'search':
        for (const f of this.selectedFilters) {
          if (f.type === 'search') // one already selected
            this.selectedFilters.splice(0, 1);
        }

        if (filter !== '')
          this.selectedFilters.push({ name: filter, type });

        this.filterCourses();
        break;

      case 'budget':
        // index = this.getFilterIndex(this.selectedLocation, this.selectedFilters, type);
        // if (index !== -1) // one already selected
        //   this.selectedFilters.splice(index, 1);
        //
        // if (filter !== LOCATION_DEFAULT)
        //   this.selectedFilters.push({ name: filter, type });
        //
        // this.selectedLocation = filter;
        // this.filterArtists();
        break;
    }
  }

  deleteFilter(filter: string, type: string): void {
    switch (type) {
      case 'category': // TODO
        // this.selectedCategory = CATEGORY_DEFAULT;
        break;

      case 'search':
        this.search = '';
        break;

      case 'budget': // TODO
        // this.selectedLocation = LOCATION_DEFAULT;
        break;
    }

    this.selectedFilters.splice(this.getFilterIndex(filter, this.selectedFilters, type), 1);
    this.filterCourses();
  }

  getFilterIndex(filter: string, array: {name: string, type: string}[], type: string): number {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === filter && array[i].type === type) return i;
    }
    return -1;
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
