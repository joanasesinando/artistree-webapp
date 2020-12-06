import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as eva from 'eva-icons';
const categories = require('src/assets/data/categories.json').categories;

export interface IGig {
  name: string;
  description: string;
  price: number;
  imagesSrc: string;
}

@Component({
  selector: 'app-discover-gigs',
  templateUrl: './discover-gigs.component.html',
  styleUrls: ['./discover-gigs.component.scss']
})
export class DiscoverGigsComponent implements OnInit, AfterViewInit {

  search;
  @ViewChild('form', { static: false }) form: NgForm;

  totalFound = 23564094; // TODO

  filterItemsCategories: {name: string, total: number}[] = [];
  sortItems: string[] = ['Popularity', 'Best selling', 'Newest'];

  gigs: IGig[] = [ // TODO: ir buscar 20 gigs
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
      imagesSrc: 'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'
    },
    {
      name: 'Lorem ipsum dolor',
      description: 'Lorem ipsum dolor sit amet, cons adipiscing eli amet gravida greco...',
      price: 34.99,
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

  loadMoreGigs(): void {
    // TODO: load more 20 gigs
  }

  doSearch(): void {
    console.log(this.search);
  }

}
