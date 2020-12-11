import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';
import {Course} from '../../../_domain/Course';
import {User} from '../../../_domain/User';
import {Gig} from '../../../_domain/Gig';

const CATEGORY_DEFAULT = 'All Categories';
const RATE_DEFAULT = 'All Rates';

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

  rateFilters: { name: string, total: number }[] = [];
  selectedRate = RATE_DEFAULT;

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

  getFiltersByCategory(): void {
    let categories: { name: string, total: number }[] = [];
    const dict = {};

    for (const course of this.coursesList) {
      if (!this.existsInArrayWithObjects(categories, course.category))
        categories.push({ name: course.category, total: 0 });
      dict[course.category] ? dict[course.category]++ : dict[course.category] = 1;
    }

    let total = 0;
    for (const category of categories) {
      category.total = dict[category.name];
      total += dict[category.name];
    }

    categories = categories.sort((a, b) => a.name <= b.name ? -1 : 1);
    categories.unshift({ name: CATEGORY_DEFAULT, total });
    this.categoryFilters = categories;
  }

  getFiltersByRate(): void {
    const rates: { name: string, total: number }[] = [
      { name: 'Unrated', total: 0 },
      { name: '5⭐', total: 0 },
      { name: '4⭐', total: 0 },
      { name: '3⭐', total: 0 },
      { name: '2⭐', total: 0 },
      { name: '1⭐', total: 0 },
    ];
    const dict = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const course of this.coursesList) {
      if (course.rate) {
        const rate = course.rate.toString();
        dict[rate] ? dict[rate]++ : dict[rate] = 1;

      } else {
        const rate = 'Unrated';
        dict[rate] ? dict[rate]++ : dict[rate] = 1;
      }
    }

    let total = 0;
    for (const rate of rates) {
      if (rate.name === 'Unrated') {
        rate.total = dict[rate.name];
        total += dict[rate.name];

      } else {
        rate.total = dict[rate.name[0]];
        total += dict[rate.name[0]];
      }
    }

    rates.unshift({ name: RATE_DEFAULT, total });
    this.rateFilters = rates;
  }

  existsInArrayWithObjects(array: {name: string, total: number}[], name: string): boolean {
    for (const item of array) {
      if (item.name === name) return true;
    }
    return false;
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

  getRate(rate: number): string {
    return rate.toString() + '⭐';
  }

  isQueryTrueSearch(course: Course): boolean {
    return !this.search ||
      !!this.parseForSearching(course.name).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(course.category).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(course.pitch).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(course.description).find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (course.list && !!this.parseForSearchingList(course.list).find(a => a.includes(this.search.toLowerCase())));
  }

  isQueryTrueCategory(course: Course): boolean {
    return this.selectedCategory === CATEGORY_DEFAULT ||
      !!this.parseForSearching(course.category).find(a => a.includes(this.selectedCategory.toLowerCase()));
  }

  isQueryTrueRate(course: Course): boolean {
    return this.selectedRate === RATE_DEFAULT ||
      (course.rate && !!this.parseForSearching(this.getRate(course.rate)).find(a => a.includes(this.selectedRate.toLowerCase()))) ||
      (!course.rate && !!this.parseForSearching('Unrated').find(a => a.includes(this.selectedRate.toLowerCase())));
  }

  filterCourses(): void {
    this.coursesToShow = [];
    for (const course of this.coursesList) {
      if (this.isQueryTrueSearch(course) && this.isQueryTrueCategory(course) && this.isQueryTrueRate(course))
        this.coursesToShow.push(course);
    }

    this.doSort(this.currentSorting);

    this.getFiltersByCategory();
    this.getFiltersByRate();
  }

  selectFilter(filter: string, type: string): void {
    // tslint:disable-next-line:prefer-const
    let index;

    switch (type) {
      case 'category':
        index = this.getFilterIndex(this.selectedCategory, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== CATEGORY_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedCategory = filter;
        this.filterCourses();
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

      case 'rate':
        index = this.getFilterIndex(this.selectedRate, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== RATE_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedRate = filter;
        this.filterCourses();
        break;
    }
  }

  deleteFilter(filter: string, type: string): void {
    switch (type) {
      case 'category':
        this.selectedCategory = CATEGORY_DEFAULT;
        break;

      case 'search':
        this.search = '';
        break;

      case 'rate':
        this.selectedRate = RATE_DEFAULT;
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
