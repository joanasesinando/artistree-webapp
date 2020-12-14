import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';

import {User} from '../../../_domain/User';
import {Gig} from '../../../_domain/Gig';
import {Course} from '../../../_domain/Course';

const CATEGORY_DEFAULT = 'All Categories';
const LOCATION_DEFAULT = 'All Locations';
const RATE_DEFAULT = 'All Rates';
const BUDGET_DEFAULT = '-';
const DURATION_DEFAULT = 'All Durations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  currentUser: User = {handler: '', joiningTimestamp: 0, name: '', type: '', uid: '', interests: [], location: ''};
  query: string;

  // tslint:disable-next-line:max-line-length
  artistsInfo: { artistsList: User[], artistsToShow: User[], artistsAfterSplit: User[], sortItems: string[], numberShowing: number, currentSorting: string, loading: boolean } = {
    artistsList: [],
    artistsToShow: [],
    artistsAfterSplit: [],
    sortItems: ['Relevance', 'Popularity', 'Best matching', 'Newest'],
    numberShowing: 20,
    currentSorting: 'Relevance',
    loading: true
  };

  // tslint:disable-next-line:max-line-length
  gigsInfo: { gigsList: Gig[], gigsToShow: Gig[], gigsAfterSplit: Gig[], sortItems: string[], numberShowing: number, currentSorting: string, loading: boolean } = {
    gigsList: [],
    gigsToShow: [],
    gigsAfterSplit: [],
    sortItems: ['Best selling', 'Rate', 'Newest'],
    numberShowing: 20,
    currentSorting: 'Best selling',
    loading: true
  };

  // tslint:disable-next-line:max-line-length
  coursesInfo: { coursesList: Course[], coursesToShow: Course[], coursesAfterSplit: Course[], sortItems: string[], numberShowing: number, currentSorting: string, loading: boolean } = {
    coursesList: [],
    coursesToShow: [],
    coursesAfterSplit: [],
    sortItems: ['Best selling', 'Rate', 'Newest'],
    numberShowing: 20,
    currentSorting: 'Best selling',
    loading: true
  };

  categoryFilters: { name: string, total: number }[] = [];
  selectedCategory = CATEGORY_DEFAULT;

  locationFilters: { name: string, total: number }[] = [];
  selectedLocation = LOCATION_DEFAULT;

  rateFilters: { name: string, total: number }[] = [];
  selectedRate = RATE_DEFAULT;

  durationFilters: { name: string, total: number }[] = [];
  selectedDuration = DURATION_DEFAULT;

  selectedBudget = BUDGET_DEFAULT;

  selectedFilters: {name: string, type: string}[] = [];

  toggles = {
    artists: true,
    gigs: true,
    courses: true
  };

  constructor(private router: ActivatedRoute, private firebaseService: FirebaseService) {
    firebaseService.auth.onAuthStateChanged(user => {
      this.firebaseService.getUserInfo(user.uid).then(userInfo => {
        this.currentUser.interests = userInfo.interests;
        if (userInfo.location) this.currentUser.location = userInfo.location;
      });
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.reset();
      this.query = params.query;
      this.loadArtists();
      this.loadGigs();
      this.loadCourses();
    });
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  loadArtists(): void {
    this.getAllArtists().then(() => {
      this.filterArtists();
      this.artistsInfo.loading = false;
    });
  }

  loadGigs(): void {
    this.getAllGigs().then(() => {
      this.filterGigs();
      this.gigsInfo.loading = false;
    });
  }

  loadCourses(): void {
    this.getAllCourses().then(() => {
      this.filterCourses();
      this.coursesInfo.loading = false;
    });
  }

  getAllArtists(): Promise<void> {
    return this.firebaseService.getDatabaseData('users/artists').then(artists => {
      for (const key in artists) {
        if (Object.prototype.hasOwnProperty.call(artists, key)) {
          const artist = artists[key] as User;
          artist.uid = key;
          this.artistsInfo.artistsList.push(artist);
        }
      }
    });
  }

  getAllGigs(): Promise<void> {
    return this.firebaseService.getDatabaseData('gigs').then(gigs => {
      for (const key in gigs) {
        if (Object.prototype.hasOwnProperty.call(gigs, key)) {
          const gig = gigs[key] as Gig;
          this.gigsInfo.gigsList.push(gig);
        }
      }
    });
  }

  getAllCourses(): Promise<void> {
    return this.firebaseService.getDatabaseData('courses').then(courses => {
      for (const key in courses) {
        if (Object.prototype.hasOwnProperty.call(courses, key)) {
          const course = courses[key] as Course;
          this.coursesInfo.coursesList.push(course);
        }
      }
    });
  }

  getFiltersByCategory(): void {
    let categories: { name: string, total: number }[] = [];
    const dict = {};

    for (const artist of this.artistsInfo.artistsList) {
      for (const area of artist.artisticAreas) {
        if (!this.existsInArrayWithObjects(categories, area))
          categories.push({ name: area, total: 0 });
        dict[area] ? dict[area]++ : dict[area] = 1;
      }
    }

    for (const gig of this.gigsInfo.gigsList) {
      if (!this.existsInArrayWithObjects(categories, gig.category))
        categories.push({ name: gig.category, total: 0 });
      dict[gig.category] ? dict[gig.category]++ : dict[gig.category] = 1;
    }

    for (const course of this.coursesInfo.coursesList) {
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

  getFiltersByLocation(): void {
    let locations: { name: string, total: number }[] = [];
    const dict = {};

    for (const artist of this.artistsInfo.artistsList) {
      if (artist.location && artist.location !== '') {
        const location = artist.location.split(',')[0];
        if (!this.existsInArrayWithObjects(locations, location))
          locations.push({ name: location, total: 0 });
        dict[location] ? dict[location]++ : dict[location] = 1;
      }
    }

    let total = 0;
    for (const location of locations) {
      location.total = dict[location.name];
      total += dict[location.name];
    }

    locations = locations.sort((a, b) => a.name <= b.name ? -1 : 1);
    locations.unshift({ name: LOCATION_DEFAULT, total });
    this.locationFilters = locations;
  }

  getFiltersByRate(): void {
    const rates: { name: string, total: number }[] = [
      { name: '5⭐', total: 0 },
      { name: '4⭐', total: 0 },
      { name: '3⭐', total: 0 },
      { name: '2⭐', total: 0 },
      { name: '1⭐', total: 0 },
      { name: 'Unrated', total: 0 }
    ];
    const dict = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    for (const gig of this.gigsInfo.gigsList) {
      let rate: string;
      if (gig.rate) rate = gig.rate.toString();
      else rate = 'Unrated';
      dict[rate] ? dict[rate]++ : dict[rate] = 1;
    }

    for (const course of this.coursesInfo.coursesList) {
      let rate: string;
      if (course.rate) rate = course.rate.toString();
      else rate = 'Unrated';
      dict[rate] ? dict[rate]++ : dict[rate] = 1;
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

  getFiltersByDuration(): void {
    let durations: { name: string, total: number }[] = [];
    const dict = {};

    for (const course of this.coursesInfo.coursesList) {
      if (!this.existsInArrayWithObjects(durations, course.duration))
        durations.push({ name: course.duration, total: 0 });
      dict[course.duration] ? dict[course.duration]++ : dict[course.duration] = 1;
    }

    let total = 0;
    for (const duration of durations) {
      duration.total = dict[duration.name];
      total += dict[duration.name];
    }

    durations = durations.sort((a, b) => a.name <= b.name ? -1 : 1);
    durations.unshift({ name: DURATION_DEFAULT, total });
    this.durationFilters = durations;
  }

  filterArtists(): void {
    this.artistsInfo.artistsToShow = [];
    for (const artist of this.artistsInfo.artistsList) {
      if (this.isQueryTrueSearch(artist, 'artist') && this.isQueryTrueCategory(artist, 'artist')
        && this.isQueryTrueLocation(artist))
        this.artistsInfo.artistsToShow.push(artist);
    }

    this.doSortArtists(this.artistsInfo.currentSorting);

    this.getFiltersByCategory();
    this.getFiltersByLocation();
  }

  filterGigs(): void {
    this.gigsInfo.gigsToShow = [];
    for (const gig of this.gigsInfo.gigsList) {
      if (this.isQueryTrueSearch(gig, 'gig') && this.isQueryTrueCategory(gig, 'gig')
        && this.isQueryTrueBudget(gig, 'gig') && this.isQueryTrueRate(gig, 'gig'))
        this.gigsInfo.gigsToShow.push(gig);
    }

    this.doSortGigs(this.gigsInfo.currentSorting);

    this.getFiltersByCategory();
    this.getFiltersByRate();
  }

  filterCourses(): void {
    this.coursesInfo.coursesToShow = [];
    for (const course of this.coursesInfo.coursesList) {
      if (this.isQueryTrueSearch(course, 'course') && this.isQueryTrueCategory(course, 'course')
        && this.isQueryTrueBudget(course, 'course') && this.isQueryTrueRate(course, 'course') && this.isQueryTrueDuration(course))
        this.coursesInfo.coursesToShow.push(course);
    }

    this.doSortCourses(this.coursesInfo.currentSorting);

    this.getFiltersByCategory();
    this.getFiltersByRate();
    this.getFiltersByDuration();
  }

  isQueryTrueSearch(item: any, type: string): boolean {
    return !this.query ||
      ( type === 'artist' && (!!this.parseForSearching(item.name).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.title).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.handler).find(a => a.includes(this.query.toLowerCase())) ||
        // tslint:disable-next-line:max-line-length
        (item.artisticAreas && !!this.parseForSearchingList(item.artisticAreas).find(a => a.includes(this.query.toLowerCase()))) ||
        (item.skills && !!this.parseForSearchingList(item.skills).find(a => a.includes(this.query.toLowerCase()))) ||
        (item.location && !!this.parseForSearching(item.location.replace(',', ' ')).find(a => a.includes(this.query.toLowerCase()))))) ||
      ( type === 'gig' && (!!this.parseForSearching(item.name).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.category).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.pitch).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.description).find(a => a.includes(this.query.toLowerCase())) ||
        // tslint:disable-next-line:max-line-length
        (item.list && !!this.parseForSearchingList(item.list).find(a => a.includes(this.query.toLowerCase()))))) ||
      ( type === 'course' && (!!this.parseForSearching(item.name).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.category).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.pitch).find(a => a.includes(this.query.toLowerCase())) ||
        !!this.parseForSearching(item.description).find(a => a.includes(this.query.toLowerCase())) ||
        // tslint:disable-next-line:max-line-length
        (item.list && !!this.parseForSearchingList(item.list).find(a => a.includes(this.query.toLowerCase())))));
  }

  isQueryTrueCategory(item: any, type: string): boolean {
    return this.selectedCategory === CATEGORY_DEFAULT ||
      ( type === 'artist' && (
        // tslint:disable-next-line:max-line-length
        item.artisticAreas && !!this.parseForSearchingList(item.artisticAreas).find(a => a.includes(this.selectedCategory.toLowerCase()))) ) ||
      ( type === 'gig' && (!!this.parseForSearching(item.category).find(a => a.includes(this.selectedCategory.toLowerCase())))) ||
      ( type === 'course' && (!!this.parseForSearching(item.category).find(a => a.includes(this.selectedCategory.toLowerCase()))));
  }

  isQueryTrueLocation(artist: User): boolean {
    return this.selectedLocation === LOCATION_DEFAULT ||
      // tslint:disable-next-line:max-line-length
      (artist.location && !!this.parseForSearching(artist.location.replace(',', ' ')).find(a => a.includes(this.selectedLocation.toLowerCase())));
  }

  isQueryTrueBudget(item: any, type: string): boolean {
    // tslint:disable-next-line:no-shadowed-variable
    const min = this.selectedBudget.split('-')[0];
    const max = this.selectedBudget.split('-')[1];

    return this.selectedBudget === BUDGET_DEFAULT ||
      // tslint:disable-next-line:max-line-length
      ( type === 'gig' && ((min !== '' && max !== '' && item.price >= parseFloat(min) && item.price <= parseFloat(max)) || (min !== '' && max === '' && item.price >= parseFloat(min)) || (min === '' && max !== '' && item.price <= parseFloat(max))) ) ||
      ( type === 'course' && ((min !== '' && max !== '' && item.price >= parseFloat(min) && item.price <= parseFloat(max)) ||
        (min !== '' && max === '' && item.price >= parseFloat(min)) ||
        (min === '' && max !== '' && item.price <= parseFloat(max))));
  }

  isQueryTrueRate(item: any, type: string): boolean {
    return this.selectedRate === RATE_DEFAULT ||
      // tslint:disable-next-line:max-line-length
      ( type === 'gig' && ((item.rate && !!this.parseForSearching(this.getRate(item.rate)).find(a => a.includes(this.selectedRate.toLowerCase()))) || (!item.rate && !!this.parseForSearching('Unrated').find(a => a.includes(this.selectedRate.toLowerCase())))) ) ||
      // tslint:disable-next-line:max-line-length
      ( type === 'course' && ((item.rate && !!this.parseForSearching(this.getRate(item.rate)).find(a => a.includes(this.selectedRate.toLowerCase()))) ||
        (!item.rate && !!this.parseForSearching('Unrated').find(a => a.includes(this.selectedRate.toLowerCase())))) );
  }

  isQueryTrueDuration(course: Course): boolean {
    return this.selectedDuration === DURATION_DEFAULT ||
      !!this.parseForSearching(course.duration).find(a => a.includes(this.selectedDuration.toLowerCase()));
  }

  getRate(rate: number): string {
    return rate.toString() + '⭐';
  }

  splitArray(max: number, array: any[]): void {
    array.splice(max, array.length - max);
  }

  loadMoreArtists(): void {
    this.artistsInfo.numberShowing += 20;
    this.artistsInfo.artistsAfterSplit = _.cloneDeep(this.artistsInfo.artistsToShow);
    this.splitArray(this.artistsInfo.numberShowing, this.artistsInfo.artistsAfterSplit);
  }

  loadMoreGigs(): void {
    this.gigsInfo.numberShowing += 20;
    this.gigsInfo.gigsAfterSplit = _.cloneDeep(this.gigsInfo.gigsToShow);
    this.splitArray(this.gigsInfo.numberShowing, this.gigsInfo.gigsAfterSplit);
  }

  loadMoreCourses(): void {
    this.coursesInfo.numberShowing += 20;
    this.coursesInfo.coursesAfterSplit = _.cloneDeep(this.coursesInfo.coursesToShow);
    this.splitArray(this.coursesInfo.numberShowing, this.coursesInfo.coursesAfterSplit);
  }

  doSortArtists(type: string): void {
    this.artistsInfo.currentSorting = type;
    switch (type) {
      case 'Relevance':
        this.artistsInfo.artistsToShow.sort((a, b) => b.relevance - a.relevance);
        this.artistsInfo.artistsAfterSplit = _.cloneDeep(this.artistsInfo.artistsToShow);
        this.splitArray(this.artistsInfo.numberShowing, this.artistsInfo.artistsAfterSplit);
        break;

      case 'Popularity':
        this.artistsInfo.artistsToShow.sort((a, b) => b.popularity - a.popularity);
        this.artistsInfo.artistsAfterSplit = _.cloneDeep(this.artistsInfo.artistsToShow);
        this.splitArray(this.artistsInfo.numberShowing, this.artistsInfo.artistsAfterSplit);
        break;

      case 'Best matching':
        this.artistsInfo.artistsToShow.sort((a, b) => {
          const aScore = this.getInterestsMatchingScore(a);
          const bScore = this.getInterestsMatchingScore(b);

          if (bScore - aScore === 0)
            return this.getLocationMatchingScore(b) - this.getLocationMatchingScore(a);
          return bScore - aScore;
        });
        this.artistsInfo.artistsAfterSplit = _.cloneDeep(this.artistsInfo.artistsToShow);
        this.splitArray(this.artistsInfo.numberShowing, this.artistsInfo.artistsAfterSplit);
        break;

      case 'Newest':
        this.artistsInfo.artistsToShow.sort((a, b) => a.joiningTimestamp - b.joiningTimestamp);
        this.artistsInfo.artistsAfterSplit = _.cloneDeep(this.artistsInfo.artistsToShow);
        this.splitArray(this.artistsInfo.numberShowing, this.artistsInfo.artistsAfterSplit);
        break;
    }
  }

  getInterestsMatchingScore(artist: User): number {
    let score = 0;
    for (const area of artist.artisticAreas) {
      if (this.currentUser.interests.includes(area)) score++;
    }
    return score;
  }

  getLocationMatchingScore(artist: User): number {
    if (!artist.location || !this.currentUser.location) return 0;
    const aLocation = artist.location.replace(' ', '').split(',')[1];
    const uLocation = this.currentUser.location.replace(' ', '').split(',')[1];
    return uLocation === aLocation ? 1 : 0;
  }

  doSortGigs(type: string): void {
    this.gigsInfo.currentSorting = type;
    switch (type) {
      case 'Best selling':
        this.gigsInfo.gigsToShow.sort((a, b) => b.timesSold - a.timesSold);
        break;

      case 'Rate':
        this.gigsInfo.gigsToShow.sort((a, b) => b.rate - a.rate);
        break;

      case 'Newest':
        this.gigsInfo.gigsToShow.sort((a, b) => b.timestamp - a.timestamp);
        break;
    }

    this.gigsInfo.gigsAfterSplit = _.cloneDeep(this.gigsInfo.gigsToShow);
    this.splitArray(this.gigsInfo.numberShowing, this.gigsInfo.gigsAfterSplit);
  }

  doSortCourses(type: string): void {
    this.coursesInfo.currentSorting = type;
    switch (type) {
      case 'Best selling':
        this.coursesInfo.coursesToShow.sort((a, b) => b.timesSold - a.timesSold);
        break;

      case 'Rate':
        this.coursesInfo.coursesToShow.sort((a, b) => b.rate - a.rate);
        break;

      case 'Newest':
        this.coursesInfo.coursesToShow.sort((a, b) => b.timestamp - a.timestamp);
        break;
    }

    this.coursesInfo.coursesAfterSplit = _.cloneDeep(this.coursesInfo.coursesToShow);
    this.splitArray(this.coursesInfo.numberShowing, this.coursesInfo.coursesAfterSplit);
  }

  selectFilter(filter: string, type: string): void {
    let index;

    switch (type) {
      case 'category':
        index = this.getFilterIndex(this.selectedCategory, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== CATEGORY_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedCategory = filter;
        this.filterArtists();
        this.filterGigs();
        this.filterCourses();
        break;

      case 'location':
        index = this.getFilterIndex(this.selectedLocation, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== LOCATION_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedLocation = filter;
        this.filterArtists();
        break;

      case 'budget':
        index = this.getFilterIndex(this.formatBudget(this.selectedBudget), this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== BUDGET_DEFAULT)
          this.selectedFilters.push({ name: this.formatBudget(filter), type });

        this.selectedBudget = filter;
        this.filterGigs();
        this.filterCourses();
        break;

      case 'rate':
        index = this.getFilterIndex(this.selectedRate, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== RATE_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedRate = filter;
        this.filterGigs();
        this.filterCourses();
        break;

      case 'duration':
        index = this.getFilterIndex(this.selectedDuration, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== DURATION_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedDuration = filter;
        this.filterCourses();
        break;
    }
  }

  deleteFilter(filter: string, type: string): void {
    switch (type) {
      case 'category':
        this.selectedCategory = CATEGORY_DEFAULT;
        break;

      case 'location':
        this.selectedLocation = LOCATION_DEFAULT;
        break;

      case 'budget':
        this.selectedBudget = BUDGET_DEFAULT;
        break;

      case 'rate':
        this.selectedRate = RATE_DEFAULT;
        break;

      case 'duration':
        this.selectedDuration = DURATION_DEFAULT;
        break;
    }

    this.selectedFilters.splice(this.getFilterIndex(filter, this.selectedFilters, type), 1);
    this.filterArtists();
  }

  updatedToggles(checked, type: string): void {
    this.toggles[type] = checked;
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

  existsInArrayWithObjects(array: {name: string, total: number}[], name: string): boolean {
    for (const item of array) {
      if (item.name === name) return true;
    }
    return false;
  }

  getFilterIndex(filter: string, array: {name: string, type: string}[], type: string): number {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === filter && array[i].type === type) return i;
    }
    return -1;
  }

  formatBudget(filter: string): string {
    // tslint:disable-next-line:no-shadowed-variable
    const min = filter.split('-')[0];
    const max = filter.split('-')[1];

    if (min !== '' && max !== '') return min + '€ - ' + max + '€';
    if (min !== '') return '>= ' + min + '€';
    if (max !== '') return '<= ' + max + '€';
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  reset(): void {
    this.artistsInfo = {
      artistsList: [],
      artistsToShow: [],
      artistsAfterSplit: [],
      sortItems: ['Relevance', 'Popularity', 'Best matching', 'Newest'],
      numberShowing: 20,
      currentSorting: 'Relevance',
      loading: true
    };

    this.gigsInfo = {
      gigsList: [],
      gigsToShow: [],
      gigsAfterSplit: [],
      sortItems: ['Best selling', 'Rate', 'Newest'],
      numberShowing: 20,
      currentSorting: 'Best selling',
      loading: true
    };

    this.coursesInfo = {
      coursesList: [],
      coursesToShow: [],
      coursesAfterSplit: [],
      sortItems: ['Best selling', 'Rate', 'Newest'],
      numberShowing: 20,
      currentSorting: 'Best selling',
      loading: true
    };

    this.categoryFilters = [];
    this.selectedCategory = CATEGORY_DEFAULT;

    this.locationFilters = [];
    this.selectedLocation = LOCATION_DEFAULT;

    this.rateFilters = [];
    this.selectedRate = RATE_DEFAULT;

    this.durationFilters = [];
    this.selectedDuration = DURATION_DEFAULT;

    this.selectedBudget = BUDGET_DEFAULT;

    this. selectedFilters = [];

    this.toggles = {
      artists: true,
      gigs: true,
      courses: true
    };
  }

}
