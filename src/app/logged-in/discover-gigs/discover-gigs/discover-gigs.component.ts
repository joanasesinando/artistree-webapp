import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';
import {Gig} from '../../../_domain/Gig';
import {User} from '../../../_domain/User';

const CATEGORY_DEFAULT = 'All Categories';

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

  isQueryTrueSearch(gig: Gig): boolean {
    return !this.search ||
      !!this.parseForSearching(gig.name).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(gig.pitch).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(gig.description).find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (gig.list && !!this.parseForSearchingList(gig.list).find(a => a.includes(this.search.toLowerCase())));
  }

  filterGigs(): void {
    this.gigsToShow = [];
    for (const gig of this.gigsList) {
      if (this.isQueryTrueSearch(gig))
        this.gigsToShow.push(gig);
    }

    this.doSort(this.currentSorting);

    // this.getFiltersByCategory();
    // this.getFiltersByLocation();
  }

  selectFilter(filter: string, type: string): void {
    // tslint:disable-next-line:prefer-const
    let index;

    switch (type) {
      case 'category':
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

        this.filterGigs();
        break;

      case 'location':
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
      case 'category':
        // this.selectedCategory = CATEGORY_DEFAULT;
        break;

      case 'search':
        this.search = '';
        break;

      case 'location':
        // this.selectedLocation = LOCATION_DEFAULT;
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
