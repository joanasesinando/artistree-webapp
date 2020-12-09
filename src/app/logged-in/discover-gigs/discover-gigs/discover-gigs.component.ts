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

  filterItemsCategories: {name: string, total: number}[] = [];
  sortItems: string[] = ['Popularity', 'Best selling', 'Newest'];

  gigsList: IGig[] = [ // TODO: ir buscar todos os gigs
    {
      name: 'Gig',
      description: 'gigg',
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

  gigs: IGig[] = [];

  constructor() {
    this.initializeFilterByCategory();
  }

  ngOnInit(): void {
    this.filterGigs(); // TODO: meter na função de load de gigs (no fim)
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  initializeFilterByCategory(): void {
    this.filterItemsCategories.push({ name: 'All Categories', total: this.gigs.length});
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
    this.filterGigs();
  }

  isQueryTrue(gig: IGig): boolean {
    return !this.search || !!gig.name.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase())) ||
      !!gig.description.toLowerCase().split(' ').find(a => a.includes(this.search.toLowerCase()));
  }

  filterGigs(): void {
    this.gigs = [];
    for (const gig of this.gigsList) {
      if (this.isQueryTrue(gig)) {
        this.gigs.push(gig);
      }
    }
  }

}
