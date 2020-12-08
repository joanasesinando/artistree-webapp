import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as eva from 'eva-icons';
import {FirebaseService} from '../../../_services/firebase.service';

const categories = require('src/assets/data/categories.json').categories;
import _ from 'lodash';

export interface IUser {
  uid: string;
  name: string;
  handler: string;
  avatar: string;
  following: number;
  followers?: number;
  location: string;
  joiningTimestamp: number;
  socialLinks: { network: string, link: string }[];
  reviewsGiven: { artistID: string, rate: number, description: string, timestamp: number }[];
  interests: string[];
  title?: string;
  artisticAreas?: string[];
  bio?: string;
  skills?: string[];
  highlights?: { title: string, description: string }[];
  reviewsReceived?: { artistID: string, rate: number, description: string, timestamp: number }[];
  portfolio?: string[];
  gigs?: any[];
  courses?: any[];
  type: string;
}

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

  filterItems: { name: string, total: number }[] = [];
  filterLocations: { name: string, total: number }[] = [];
  sortItems: string[] = ['Popularity', 'Best matching', 'Newest'];

  numberArtistsShowing = 20;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.loadArtists();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  initializeFilterByCategory(): void {
    let cat: { name: string, total: number }[] = [];
    for (const artist of this.artistsList) {
      for (const area of artist.artisticAreas) {
        if (!this.existsInArrayWithObjects(cat, {name: area, total: 0}))
          cat.push({name: area, total: 0}); // FIXME
      }
    }
    cat = this.orderAlphabetically(cat);
    cat.unshift({ name: 'All Categories', total: cat.length});
    this.filterItems = cat;
  }

  initializeFilterByLocation(): void {
    const locations: { name: string, total: number }[] = [];
    for (const artist of this.artistsList) {
      if (artist.location && artist.location !== '' &&
        !this.existsInArrayWithObjects(locations, {name: artist.location, total: 0}))
        locations.push({
          name: artist.location.split(',')[0],
          total: 0 // FIXME
        });
    }
    this.filterLocations = this.orderAlphabetically(locations);
  }

  existsInArrayWithObjects(array: {name: string, total: number}[], obj: {name: string, total: number}): boolean {
    for (const item of array) {
      if (item.name === obj.name)
        return true;
    }
    return false;
  }

  orderAlphabetically(array: {name: string, total: number}[]): {name: string, total: number}[] {
    return array.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
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

  loadArtists(): void {
    this.getAllArtists().then(() => {
      this.filterArtists();
    });
  }

  splitArtists(max: number, artists: IUser[]): void {
    artists.splice(max, artists.length - max);
  }

  loadMoreArtists(): void {
    this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
    this.splitArtists(this.numberArtistsShowing + 20, this.artistsAfterSplit);
  }

  doSearch(): void {
    this.filterArtists();
  }

  listToString(list: string[]): string {
    if (list.length > 0) {
      let s = list[0];
      for (let i = 0; i < list.length; i++) {
        if (i !== 0)
          s += ' ' + list[i];
      }
      return s;
    }
    return '';
  }

  isQueryTrue(artist: IUser): boolean {
    return !this.search ||
      !!artist.name.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      !!artist.title.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      !!artist.handler.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      // tslint:disable-next-line:max-line-length
      (artist.artisticAreas && !!this.listToString(artist.artisticAreas).toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase()))) ||
      (artist.skills && !!this.listToString(artist.skills).toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())));
  }

  filterArtists(): void {
    this.artistsToShow = [];
    for (const artist of this.artistsList) {
      if (this.isQueryTrue(artist)) {
        this.artistsToShow.push(artist);
      }
    }

    this.artistsAfterSplit = _.cloneDeep(this.artistsToShow);
    this.splitArtists(this.numberArtistsShowing, this.artistsAfterSplit);

    this.initializeFilterByCategory();
    this.initializeFilterByLocation();
  }

}
