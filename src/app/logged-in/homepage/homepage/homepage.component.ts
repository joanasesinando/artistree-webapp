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
    autoplay: false,
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
  lives: Live[] = [];

  feeds = [
    {
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Zaynah Gilmore',
      title: 'Phootgrapher',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: 1607681253843,
      imgsURL: [
        'https://images.unsplash.com/photo-1607825143721-88249c959196?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1607825143721-88249c959196?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1607825143721-88249c959196?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      ],
      likes: {
        liked: true,
        total: 27
      },
      commentsTotal: 5
    },
    {
      avatar: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Zaynah Gilmore',
      title: 'Phootgrapher',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Id vitae tortor elit viverra ante sem. Imperdiet lectus duis in tortor, sit gravida. Rutrum diam in nisi justo. Ultrices eget donec diam amet sed tincidunt arcu.',
      timestamp: 1607681253843,
      likes: {
        liked: true,
        total: 27
      },
      commentsTotal: 5
    }
  ];

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    this.getArtists();
    this.getLives();
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  async getLives(): Promise<void> {
    await this.firebase.getAllLives().then(async lives => {
      for (const live of lives) {
        await this.firebase.getUserInfo(live.artistID).then(artist => {
          live.artist = artist;
        });
      }
      this.lives = lives;
    });
  }

  getArtists(): void {
    this.firebase.getDatabaseData('users/artists/' + 'RdJFySIWaZWNshH3Ca9FOP5AQZI2').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'IlDV2dDEfTa49ncrQHycGwmamdt2').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'DBz9f0xfUEMxYCa0a0ijcpYGwOt1').then(user => {
      this.artists.push(user as User);
    });
  }

  loadIcons(): void {
    eva.replace();
  }

}
