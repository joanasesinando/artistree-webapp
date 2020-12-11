import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as eva from 'eva-icons';
import {Course} from '../../../_domain/Course';
const categories = require('src/assets/data/categories.json').categories;

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss']
})
export class AcademyComponent implements OnInit, AfterViewInit {

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  filterItemsCategories: {name: string, total: number}[] = [];
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
  sortItems: string[] = ['Popularity', 'Best selling', 'Newest'];

  coursesList: Course[] = [ // TODO: ir buscar todos os cursos
    {
      id: 1,
      name: 'Lorem ipsum dolor',
      pitch: 'sdfgd',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80']
    },
    {
      id: 2,
      name: 'Lorem ipsum dolor',
      pitch: 'sdfgd',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80']
    },
    {
      id: 3,
      name: 'Lorem ipsum dolor',
      pitch: 'sdfgd',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesURL: ['https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80']
    },
  ];

  courses: Course[] = [];

  constructor() {
    this.initializeFilterByCategory();
  }

  ngOnInit(): void {
    this.filterCourses(); // TODO: meter na função de load de cursos (no fim)
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  initializeFilterByCategory(): void {
    this.filterItemsCategories.push({ name: 'All Categories', total: this.courses.length});
    for (const category of categories) {
      // TODO: get total for a specific category
      const total = 12;
      this.filterItemsCategories.push({ name: category, total});
    }
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  loadMoreArtists(): void {
    // TODO: load more 20 artists
  }

  doSearch(): void {
    this.filterCourses();
  }

  isQueryTrue(course: Course): boolean {
    return !this.search || !!course.name.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      !!course.description.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase()));
  }

  filterCourses(): void {
    this.courses = [];
    for (const course of this.coursesList) {
      if (this.isQueryTrue(course)) {
        this.courses.push(course);
      }
    }
  }

}
