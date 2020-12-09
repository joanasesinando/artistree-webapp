import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import {FirebaseService} from '../../../_services/firebase.service';
import {IUser} from '../../../_domain/User';

import * as eva from 'eva-icons';
import _ from 'lodash';

const CATEGORY_DEFAULT = 'All Categories';
const LOCATION_DEFAULT = 'All Locations';

@Component({
  selector: 'app-discover-artists',
  templateUrl: './discover-artists.component.html',
  styleUrls: ['./discover-artists.component.scss']
})
export class DiscoverArtistsComponent implements OnInit, AfterViewInit {

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  artistsList: IUser[] = [];
  artistsToShow: IUser[] = [];
  artistsAfterSplit: IUser[] = [];

  categoryFilters: { name: string, total: number }[] = [];
  selectedCategory = CATEGORY_DEFAULT;

  locationFilters: { name: string, total: number }[] = [];
  selectedLocation = LOCATION_DEFAULT;

  selectedFilters: {name: string, type: string}[] = [];
  sortItems: string[] = ['Popularity', 'Best matching', 'Newest'];

  numberArtistsShowing = 20;
  loading = true;

  constructor(private firebaseService: FirebaseService) { }

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
          const artist = artists[key] as IUser;
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

  splitArtists(max: number, artists: IUser[]): void {
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

  listToString(list: string[]): string {
    if (list.length > 0) {
      let s = list[0];
      for (let i = 0; i < list.length; i++) {
        if (i !== 0) s += ' ' + list[i];
      }
      return s;
    }
    return '';
  }

  isQueryTrueSearch(artist: IUser): boolean { // FIXME: multiple words
    return !this.search || !!artist.name.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      !!artist.title.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      !!artist.handler.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (artist.artisticAreas && !!this.listToString(artist.artisticAreas).toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase()))) ||
      (artist.skills && !!this.listToString(artist.skills).toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())));
  }

  isQueryTrueCategory(artist: IUser): boolean { // FIXME: multiple words
    return this.selectedCategory === 'All Categories' ||
      // tslint:disable-next-line:max-line-length
      (artist.artisticAreas && !!this.listToString(artist.artisticAreas).toLowerCase().split(' ').find(a => a.includes(this.selectedCategory.toLowerCase())));
  }

  isQueryTrueLocation(artist: IUser): boolean { // FIXME: multiple words
    return this.selectedLocation === LOCATION_DEFAULT ||
      // tslint:disable-next-line:max-line-length
      (artist.location && !!artist.location.toLowerCase().replace(',', '').split(' ').find(a => a.includes(this.selectedLocation.toLowerCase())));
  }

  filterArtists(): void {
    this.artistsToShow = [];
    for (const artist of this.artistsList) {
      if (this.isQueryTrueSearch(artist) && this.isQueryTrueCategory(artist) && this.isQueryTrueLocation(artist))
        this.artistsToShow.push(artist);
    }

    this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
    this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);

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
