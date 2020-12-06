import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
const categories = require('src/assets/data/categories.json').categories;
import * as eva from 'eva-icons';
import {IArtist} from '../../discover-artists/discover-artists/discover-artists.component';
import {IGig} from '../../discover-gigs/discover-gigs/discover-gigs.component';
import {ICourse} from '../../academy/academy/academy.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit {

  query: string;

  artistInfo = {
    totalFound: 1231, // TODO
    sortItems: ['Popularity', 'Best matching', 'Newest']
  };

  gigsInfo = {
    totalFound: 22574, // TODO
    sortItems: ['Popularity', 'Best selling', 'Newest']
  };

  coursesInfo = {
    totalFound: 533, // TODO
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
  totalFound = this.artistInfo.totalFound + this.gigsInfo.totalFound + this.coursesInfo.totalFound;

  artists: IArtist[] = [ // TODO: ir buscar 20 artists
    {
      name: 'Ned Tomlinson',
      job: 'Magician',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    },
    {
      name: 'Bernardo Marques',
      job: 'Full-Stack Developer',
      avatarSrc: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      imagesSrc: [
        'https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1501854140801-50d01698950b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1680&q=80',
        'https://images.unsplash.com/photo-1536431311719-398b6704d4cc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
        'https://images.unsplash.com/photo-1508558936510-0af1e3cccbab?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1500&q=80'
      ]
    }
  ];

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
    }
  ];

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
    }
  ];

  constructor(private router: ActivatedRoute) {
    this.initializeFilterByCategory();
  }

  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.query = params.query;
    });
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  initializeFilterByCategory(): void {
    this.filterItemsCategory.push({ name: 'All Categories', total: this.totalFound});
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

}
