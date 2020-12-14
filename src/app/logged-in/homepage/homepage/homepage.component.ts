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
      avatar: 'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OXx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Jules Ireland',
      title: 'Photographer',
      description: 'Guys! Look at my new toys. Don\'t you love them? Comment down below',
      timestamp: 1607681253843,
      imgsURL: [
        'https://images.unsplash.com/photo-1545997281-2cfe4d4b740f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHRveXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1590880483437-1f12ab91a4b9?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1599988288505-b99835a1e342?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=600&q=60'
      ],
      likes: {
        liked: true,
        total: 27
      },
      commentsTotal: 5
    },
    {
      avatar: 'https://images.unsplash.com/photo-1551843073-4a9a5b6fcd5f?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Elyse Mccormack',
      title: 'Circus Performer',
      description: 'New show open for tickets in Rome! Go see us perform',
      timestamp: 1607681253843,
      likes: {
        liked: false,
        total: 198
      },
      commentsTotal: 56
    },
    {
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8cG9ydHJhaXR8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Arabella Muller',
      title: 'Magician',
      description: 'I just bought a new card set. Isn\' it cool?',
      timestamp: 1607681253887,
      imgsURL: [
        'https://images.unsplash.com/photo-1594998164298-bcbef14f3877?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'
      ],
      likes: {
        liked: false,
        total: 34
      },
      commentsTotal: 4
    },
    {
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHBvcnRyYWl0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
      name: 'Vicky Pearce',
      title: 'Actress',
      description: 'Here is my latest performance. Were you guys there?',
      timestamp: 1607681253887,
      imgsURL: [
        'https://images.unsplash.com/photo-1503095396549-807759245b35?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8dGhlYXRyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1495131796982-281014f71fbd?ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
        'https://images.unsplash.com/photo-1513106580091-1d82408b8cd6?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8dGhlYXRyZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
      ],
      likes: {
        liked: true,
        total: 73
      },
      commentsTotal: 18
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
    this.firebase.getDatabaseData('users/artists/' + 'dUnRkuvAr1hAdTTzTYYYcGlQJ2c2').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + '8CCfmxvGbhZz6Rl2T3bejmimGf53').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'SpflxeY1zHMLdjpQSkMV7gcFvFE3').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'Dq7iLW3x2NSE0NlG52HoA7raxr63').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'TU3GaIEvSccAtByGkEC0KUZ0IRs1').then(user => {
      this.artists.push(user as User);
    });

    this.firebase.getDatabaseData('users/artists/' + 'tpg6rPti7jULsSZVyWMxxqy0X022').then(user => {
      this.artists.push(user as User);
    });
  }

  loadIcons(): void {
    eva.replace();
  }

}
