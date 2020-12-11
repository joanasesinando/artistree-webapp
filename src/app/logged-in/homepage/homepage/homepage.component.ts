import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Live} from '../../../_domain/Live';

import * as eva from 'eva-icons';
import {User} from '../../../_domain/User';
import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit {

  bannerItems: { imgUrl: string, title: string, description: string, textColor: string }[] = [
    {
      imgUrl: 'assets/imgs/banners/homepage.png',
      title: 'Be on the front row',
      description: 'Watch live performances from your favorite artists online.',
      textColor: 'white'
    },
    {
      imgUrl: 'assets/imgs/banners/discover-artists.png',
      title: 'Discover new talents',
      description: 'Find artists that you like and identify with.',
      textColor: 'white'
    },
    {
      imgUrl: 'assets/imgs/banners/discover-gigs.png',
      title: 'Marketplace',
      description: 'Find the perfect gig for your needs.',
      textColor: 'grey'
    },
    {
      imgUrl: 'assets/imgs/banners/academy.png',
      title: 'Learn from the pros',
      description: 'Boost your knowledge with our selection of courses.',
      textColor: 'white'
    }
  ];

  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    focusOnSelect: false,
    arrows: true,
    nextArrow: '<div *ngIf="this.lives.length > 1" class="carousel-control-next"><div class="icon-wrapper"><i data-eva="arrow-forward-outline"></i></div></div>',
    prevArrow: '<div *ngIf="this.lives.length > 1" class="carousel-control-prev"><div class="icon-wrapper"><i data-eva="arrow-back-outline"></i></div></div>',
    dots: false,
    fade: false,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 900,
        settings: {
          mobileFirst: true,
          slidesToShow: 1,
          arrows: true,
          lazyload: 'ondemand',
        }
      }
    ]
  };

  artists: User[] = [];

  lives: Live[] = [
    {
      free: false,
      artistID: '32xBShZg1oMMj7bANbz8NgyfZYy2',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: '4ZQfkGnFvZdSZDKx9pYSGtla9Sw2',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: '8CCfmxvGbhZz6Rl2T3bejmimGf53',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: '8M21g7mFsOPfXzHVqOIi9UhKKuu2',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: 'Aciq4JOLk6hqSLekTlgHlroxZ9m1',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: 'DBz9f0xfUEMxYCa0a0ijcpYGwOt1',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: 'Dq7iLW3x2NSE0NlG52HoA7raxr63',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: 'IlDV2dDEfTa49ncrQHycGwmamdt2',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: 'IlDV2dDEfTa49ncrQHycGwmamdt2',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    },
    {
      free: true,
      artistID: 'RdJFySIWaZWNshH3Ca9FOP5AQZI2',
      name: 'Lorem ipsum dolor sit amet',
      tags: ['lorem', 'ipsum'],
      thumbnail: 'https://images.unsplash.com/photo-1607469425855-f9b073ab812c?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
    }
  ];

  feeds = [
    {
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Zaynah Gilmore',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: '1607681253843',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjR8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Stella Lam',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: '1607681253843',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Arabella Mueller',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: '1607681253843',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Arabella Mueller',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: '1607681253843',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Arabella Mueller',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: '1607681253843',
    },
    {
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Arabella Mueller',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: '1607681253843',
    }
  ];

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getArtists();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  getArtists(): void {
    this.firebase.getDatabaseData('users/artists/' + 'RdJFySIWaZWNshH3Ca9FOP5AQZI2').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'IlDV2dDEfTa49ncrQHycGwmamdt2').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'IlDV2dDEfTa49ncrQHycGwmamdt2').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'DBz9f0xfUEMxYCa0a0ijcpYGwOt1').then(user => {
      this.artists.push(user as User);
      this.artists.push(user as User);
    });
  }

  getTime(timestamp: number): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  }

}
