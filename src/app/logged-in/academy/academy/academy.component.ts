import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as eva from 'eva-icons';
const categories = require('src/assets/data/categories.json').categories;

export interface ICourse {
  name: string;
  description: string;
  duration: string;
  price: number;
  imagesSrc: string;
}

@Component({
  selector: 'app-academy',
  templateUrl: './academy.component.html',
  styleUrls: ['./academy.component.scss']
})
export class AcademyComponent implements OnInit, AfterViewInit {

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  totalFound = 53856; // TODO

  filterItemsCategories: {name: string, total: number}[] = [];
  filterItemsDuration: {name: string, total: number}[] = [ // TODO
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

  courses: ICourse[] = [ // TODO
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      duration: '3 weeks',
      price: 64.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    }
  ];

  constructor() {
    this.initializeFilterByCategory();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  initializeFilterByCategory(): void {
    this.filterItemsCategories.push({ name: 'All Categories', total: this.totalFound});
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
    console.log(this.search);
  }

}
