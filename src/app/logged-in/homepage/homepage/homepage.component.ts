import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

}
