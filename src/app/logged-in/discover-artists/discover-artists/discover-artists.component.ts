import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import _ from 'lodash';

import {User} from '../../../_domain/User';

const CATEGORY_DEFAULT = 'All Categories';
const LOCATION_DEFAULT = 'All Locations';

@Component({
  selector: 'app-discover-artists',
  templateUrl: './discover-artists.component.html',
  styleUrls: ['./discover-artists.component.scss']
})
export class DiscoverArtistsComponent implements OnInit, AfterViewInit {

  currentUser: User = {handler: '', joiningTimestamp: 0, name: '', type: '', uid: '', interests: [], location: ''};

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  artistsList: User[] = [];
  artistsToShow: User[] = [];
  artistsAfterSplit: User[] = [];

  categoryFilters: { name: string, total: number }[] = [];
  selectedCategory = CATEGORY_DEFAULT;

  locationFilters: { name: string, total: number }[] = [];
  selectedLocation = LOCATION_DEFAULT;

  selectedFilters: {name: string, type: string}[] = [];
  sortItems: string[] = ['Relevance', 'Popularity', 'Best matching', 'Newest'];

  numberArtistsShowing = 20;
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
    this.loadArtists();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  loadArtists(): void {
    this.getAllArtists().then(() => {
      this.filterArtists();
      this.loading = false;
    });
  }

  getAllArtists(): Promise<void> {
    return this.firebaseService.getDatabaseData('users/artists').then(artists => {
      for (const key in artists) {
        if (Object.prototype.hasOwnProperty.call(artists, key)) {
          const artist = artists[key] as User;
          artist.uid = key;
          this.artistsList.push(artist);
        }
      }
    });
  }

  getFiltersByCategory(): void {
    let categories: { name: string, total: number }[] = [];
    const dict = {};

    for (const artist of this.artistsList) {
      for (const area of artist.artisticAreas) {
        if (!this.existsInArrayWithObjects(categories, area))
          categories.push({ name: area, total: 0 });
        dict[area] ? dict[area]++ : dict[area] = 1;
      }
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

    for (const artist of this.artistsList) {
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

  existsInArrayWithObjects(array: {name: string, total: number}[], name: string): boolean {
    for (const item of array) {
      if (item.name === name) return true;
    }
    return false;
  }

  splitArtists(max: number, artists: User[]): void {
    artists.splice(max, artists.length - max);
  }

  loadMoreArtists(): void {
    this.numberArtistsShowing += 20;
    this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
    this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
  }

  doSearch(): void {
    this.selectFilter(this.search, 'search');
  }

  doSort(type: string): void {
    this.currentSorting = type;
    switch (type) {
      case 'Relevance':
        this.artistsToShow.sort((a, b) => b.relevance - a.relevance);
        this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
        break;

      case 'Popularity':
        this.artistsToShow.sort((a, b) => b.popularity - a.popularity);
        this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
        break;

      case 'Best matching':
        this.artistsToShow.sort((a, b) => {
          const aScore = this.getInterestsMatchingScore(a);
          const bScore = this.getInterestsMatchingScore(b);

          if (bScore - aScore === 0)
            return this.getLocationMatchingScore(b) - this.getLocationMatchingScore(a);
          return bScore - aScore;
        });
        this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
        break;

      case 'Newest':
        this.artistsToShow.sort((a, b) => a.joiningTimestamp - b.joiningTimestamp);
        this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
        this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);
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

  isQueryTrueSearch(artist: User): boolean {
    return !this.search ||
      !!this.parseForSearching(artist.name).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(artist.title).find(a => a.includes(this.search.toLowerCase())) ||
      !!this.parseForSearching(artist.handler).find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (artist.artisticAreas && !!this.parseForSearchingList(artist.artisticAreas).find(a => a.includes(this.search.toLowerCase()))) ||
      (artist.skills && !!this.parseForSearchingList(artist.skills).find(a => a.includes(this.search.toLowerCase()))) ||
      (artist.location && !!this.parseForSearching(artist.location.replace(',', ' ')).find(a => a.includes(this.search.toLowerCase())));
  }

  isQueryTrueCategory(artist: User): boolean {
    return this.selectedCategory === CATEGORY_DEFAULT ||
      // tslint:disable-next-line:max-line-length
      (artist.artisticAreas && !!this.parseForSearchingList(artist.artisticAreas).find(a => a.includes(this.selectedCategory.toLowerCase())));
  }

  isQueryTrueLocation(artist: User): boolean {
    return this.selectedLocation === LOCATION_DEFAULT ||
      // tslint:disable-next-line:max-line-length
      (artist.location && !!this.parseForSearching(artist.location.replace(',', ' ')).find(a => a.includes(this.selectedLocation.toLowerCase())));
  }

  filterArtists(): void {
    this.artistsToShow = [];
    for (const artist of this.artistsList) {
      if (this.isQueryTrueSearch(artist) && this.isQueryTrueCategory(artist) && this.isQueryTrueLocation(artist))
        this.artistsToShow.push(artist);
    }

    this.doSort(this.currentSorting);

    this.getFiltersByCategory();
    this.getFiltersByLocation();
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
        break;

      case 'search':
        for (const f of this.selectedFilters) {
          if (f.type === 'search') // one already selected
            this.selectedFilters.splice(0, 1);
        }

        if (filter !== '')
          this.selectedFilters.push({ name: filter, type });

        this.filterArtists();
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

      case 'location':
        this.selectedLocation = LOCATION_DEFAULT;
        break;
    }

    this.selectedFilters.splice(this.getFilterIndex(filter, this.selectedFilters, type), 1);
    this.filterArtists();
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
