import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';
import {Gig} from '../../../_domain/Gig';
import {User} from '../../../_domain/User';
import {Course} from '../../../_domain/Course';

const CATEGORY_DEFAULT = 'All Categories';
const RATE_DEFAULT = 'All Rates';

@Component({
  selector: 'app-discover-gigs',
  templateUrl: './discover-gigs.component.html',
  styleUrls: ['./discover-gigs.component.scss']
})
export class DiscoverGigsComponent implements OnInit, AfterViewInit {

  currentUser: User = {handler: '', joiningTimestamp: 0, name: '', type: '', uid: '', interests: [], location: ''};

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  gigsList: Gig[] = [];
  gigsToShow: Gig[] = [];
  gigsAfterSplit: Gig[] = [];

  categoryFilters: { name: string, total: number }[] = [];
  selectedCategory = CATEGORY_DEFAULT;

  rateFilters: { name: string, total: number }[] = [];
  selectedRate = RATE_DEFAULT;

  selectedFilters: {name: string, type: string}[] = [];
  sortItems: string[] = ['Rate', 'Popularity', 'Best matching', 'Newest'];

  numberGigsShowing = 20;
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
    this.loadGigs();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  loadGigs(): void {
    this.getAllGigs().then(() => {
      this.filterGigs();
      this.loading = false;
    });
  }

  getAllGigs(): Promise<void> {
    return this.firebaseService.getDatabaseData('gigs').then(gigs => {
      for (const key in gigs) {
        if (Object.prototype.hasOwnProperty.call(gigs, key)) {
          const gig = gigs[key] as Gig;
          this.gigsList.push(gig);
        }
      }
    });
  }

  getFiltersByCategory(): void {
    let categories: { name: string, total: number }[] = [];
    const dict = {};

    for (const gig of this.gigsList) {
      if (!this.existsInArrayWithObjects(categories, gig.category))
        categories.push({ name: gig.category, total: 0 });
      dict[gig.category] ? dict[gig.category]++ : dict[gig.category] = 1;
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

    for (const gig of this.gigsList) {
      if (gig.rate) {
        const rate = gig.rate.toString();
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

  splitGigs(max: number, gigs: Gig[]): void {
    gigs.splice(max, gigs.length - max);
  }

  loadMoreGigs(): void {
    this.numberGigsShowing += 20;
    this.gigsAfterSplit = _.cloneDeep(this.gigsToShow);
    this.splitGigs(this.numberGigsShowing, this.gigsAfterSplit);
  }

  doSearch(): void {
    this.selectFilter(this.search, 'search');
  }

  doSort(type: string): void {
    this.currentSorting = type;
    switch (type) {
      case 'Rate': // TODO
        this.gigsToShow.sort((a, b) => b.rate - a.rate);
        this.gigsAfterSplit = _.cloneDeep(this.gigsToShow);
        this.splitGigs(this.numberGigsShowing, this.gigsAfterSplit);
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

  isQueryTrueSearch(gig: Gig): boolean {
    return !this.search ||
      !!this.parseForSearching(gig.name).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(gig.category).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(gig.pitch).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(gig.description).find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (gig.list && !!this.parseForSearchingList(gig.list).find(a => a.includes(this.search.toLowerCase())));
  }

  isQueryTrueCategory(gig: Gig): boolean {
    return this.selectedCategory === CATEGORY_DEFAULT ||
      !!this.parseForSearching(gig.category).find(a => a.includes(this.selectedCategory.toLowerCase()));
  }

  isQueryTrueRate(gig: Gig): boolean {
    return this.selectedRate === RATE_DEFAULT ||
      (gig.rate && !!this.parseForSearching(this.getRate(gig.rate)).find(a => a.includes(this.selectedRate.toLowerCase()))) ||
      (!gig.rate && !!this.parseForSearching('Unrated').find(a => a.includes(this.selectedRate.toLowerCase())));
  }

  filterGigs(): void {
    this.gigsToShow = [];
    for (const gig of this.gigsList) {
      if (this.isQueryTrueSearch(gig) && this.isQueryTrueCategory(gig) && this.isQueryTrueRate(gig))
        this.gigsToShow.push(gig);
    }

    this.doSort(this.currentSorting);

    this.getFiltersByCategory();
    this.getFiltersByRate();
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
        this.filterGigs();
        break;

      case 'search':
        for (const f of this.selectedFilters) {
          if (f.type === 'search') // one already selected
            this.selectedFilters.splice(0, 1);
        }

        if (filter !== '')
          this.selectedFilters.push({ name: filter, type });

        this.filterGigs();
        break;

      case 'rate':
        index = this.getFilterIndex(this.selectedRate, this.selectedFilters, type);
        if (index !== -1) // one already selected
          this.selectedFilters.splice(index, 1);

        if (filter !== RATE_DEFAULT)
          this.selectedFilters.push({ name: filter, type });

        this.selectedRate = filter;
        this.filterGigs();
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
    this.filterGigs();
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
