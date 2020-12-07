import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner-carousel',
  templateUrl: './banner-carousel.component.html',
  styleUrls: ['./banner-carousel.component.scss']
})
export class BannerCarouselComponent implements OnInit {

  @Input() items: { imgUrl: string, title: string, description: string, textColor: string }[];
  @Input() id: string;

  constructor() { }

  ngOnInit(): void {
  }

}
