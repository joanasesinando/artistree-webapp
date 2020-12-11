import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
const categories = require('src/assets/data/categories.json').categories;
import * as eva from 'eva-icons';
import {User} from '../../../_domain/User';
import {Gig} from '../../../_domain/Gig';
import {Course} from '../../../_domain/Course';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  query: string;

  artistInfo = {
    sortItems: ['Popularity', 'Best matching', 'Newest']
  };

  gigsInfo = {
    sortItems: ['Popularity', 'Best selling', 'Newest']
  };

  coursesInfo = {
    sortItems: ['Popularity', 'Best selling', 'Newest']
  };

  filterItemsCategory: {name: string, total: number}[] = [];
  filterItemsDuration: {name: string, total: number}[] = [
    {
      name: 'A few hours',
      total: 12
    },
    {
      name: 'Less than 1 week',
      total: 12
    },
    {
      name: '1 week',
      total: 12
    },
    {
      name: '2 weeks',
      total: 12
    },
    {
      name: '3 weeks',
      total: 12
    },
    {
      name: 'Between 1 - 3 months',
      total: 12
    },
    {
      name: 'Between 3 - 6 months',
      total: 12
    },
    {
      name: 'Between 6 - 12 months',
      total: 12
    },
    {
      name: 'More than 1 year',
      total: 12
    },
  ];

  artistsList: User[] = [ // TODO: ir buscar todos os artists

  ];

  gigsList: Gig[] = [ // TODO: ir buscar todos os gigs
    {
      id: 1,
      name: 'Ned gig',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'],
      pitch: 'sdfghfd'
    },
    {
      id: 2,
      name: 'Ned gig',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'],
      pitch: 'sdfghfd'
    },
    {
      id: 3,
      name: 'Ned gig',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'],
      pitch: 'sdfghfd'
    },
  ];

  coursesList: Course[] = [ // TODO: ir buscar todos os courses
    {
      id: 1,
      pitch: 'sdfgh',
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80']
    }
  ];

  artists: User[] = [];
  gigs: Gig[] = [];
  courses: Course[] = [];

  toggles = {
    artists: true,
    gigs: true,
    courses: true
  };

  constructor(private router: ActivatedRoute) {
    this.initializeFilterByCategory();
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.query = params.query;
      this.filterArtists(); // TODO: meter na função de load (no fim)
      this.filterGigs(); // TODO: meter na função de load (no fim)
      this.filterCourses(); // TODO: meter na função de load (no fim)
    });
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  initializeFilterByCategory(): void {
    this.filterItemsCategory.push({ name: 'All Categories', total: this.artists.length + this.gigs.length + this.courses.length});
    for (const category of categories) {
      // TODO: get total for a specific category
      const total = 1200;
      this.filterItemsCategory.push({ name: category, total});
    }
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  loadMoreArtists(): void {
    // TODO: load more artists
  }

  loadMoreGigs(): void {
    // TODO: load more gigs
  }

  loadMoreCourses(): void {
    // TODO: load more courses
  }

  isQueryTrueArtist(artist: User): boolean {
    return !this.query || !!artist.name.toLowerCase().split(' ').find(a => a.includes(this.query.toLowerCase())) ||
      !!artist.title.toLowerCase().split(' ').find(a => a.includes(this.query.toLowerCase()));
  }

  isQueryTrueGigs(gig: Gig): boolean {
    return !this.query || !!gig.name.toLowerCase().split(' ').find(a => a.includes(this.query.toLowerCase())) ||
      !!gig.description.toLowerCase().split(' ').find(a => a.includes(this.query.toLowerCase()));
  }

  isQueryTrueCourses(course: Course): boolean {
    return !this.query || !!course.name.toLowerCase().split(' ').find(a => a.includes(this.query.toLowerCase())) ||
      !!course.description.toLowerCase().split(' ').find(a => a.includes(this.query.toLowerCase()));
  }

  filterArtists(): void {
    this.artists = [];
    for (const artist of this.artistsList) {
      if (this.isQueryTrueArtist(artist)) {
        this.artists.push(artist);
      }
    }
  }

  filterGigs(): void {
    this.gigs = [];
    for (const gig of this.gigsList) {
      if (this.isQueryTrueGigs(gig)) {
        this.gigs.push(gig);
      }
    }
  }

  filterCourses(): void {
    this.courses = [];
    for (const course of this.coursesList) {
      if (this.isQueryTrueCourses(course)) {
        this.courses.push(course);
      }
    }
  }

  updatedToggles(checked, type: string): void {
    this.toggles[type] = checked;
  }

}
