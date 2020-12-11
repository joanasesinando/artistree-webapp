import {AfterViewInit, Component, HostListener, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../../_services/firebase.service';

import * as lightbox from 'lightbox2';
import {User} from '../../../_domain/User';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: User;

  newImage: string;

  MOBILE_WIDTH = 575;
  MD_WIDTH = 992;

  portfolioDivided: string[][];

  gridView1x: boolean;
  gridView4x: boolean;
  gridView6x: boolean;

  deleteMode = false;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit(): void {
    this.onWindowResize();
    this.divideIntoSections();
  }

  ngAfterViewInit(): void {
    lightbox.option({
      resizeDuration: 200,
      wrapAround: true
    });
  }

  divideIntoSections(): void {
    this.portfolioDivided = [];
    let divideAfter = 0;

    if (this.gridView1x) divideAfter = 1;
    else if (this.gridView4x) divideAfter = 4;
    else if (this.gridView6x) divideAfter = 6;

    let count = 0;
    let temp: string[] = [];

    for (let i = 0; i < this.user.portfolio.length; i++) {
      const portfolioImg = this.user.portfolio[i];

      count++;
      temp.push(portfolioImg);

      if (count === divideAfter || i === this.user.portfolio.length - 1) {
        this.portfolioDivided.push(temp);
        temp = [];
        count = 0;
      }
    }
  }

  getPadding(index: number, type: string): boolean {
    switch (type) {
      case 'right':
        if (window.innerWidth > this.MOBILE_WIDTH && window.innerWidth < this.MD_WIDTH)
          return index % 2 === 0;
        else if (window.innerWidth > this.MD_WIDTH)
          return index % 3 !== 2;
        break;

      case 'left':
        if (window.innerWidth > this.MOBILE_WIDTH && window.innerWidth < this.MD_WIDTH)
          return index % 2 !== 0;

        else if (window.innerWidth > this.MD_WIDTH)
          return index % 3 !== 0;
        break;
    }
  }

  addImage(): void {
    this.user.portfolio.push(this.newImage);
    this.divideIntoSections();
    this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
      portfolio: this.user.portfolio
    });
    this.newImage = '';
  }

  deleteImage(imgURL: string): void {
    this.user.portfolio.splice(this.user.portfolio.indexOf(imgURL), 1);
    this.divideIntoSections();
    this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
      portfolio: this.user.portfolio
    });

    if (this.user.portfolio.length === 0)
      this.deleteMode = false;
  }

  @HostListener('window:resize', [])
  onWindowResize(): void {
    this.gridView1x = window.innerWidth <= this.MOBILE_WIDTH;
    this.gridView4x = window.innerWidth > this.MOBILE_WIDTH && window.innerWidth <= this.MD_WIDTH;
    this.gridView6x = window.innerWidth > this.MD_WIDTH;
    this.divideIntoSections();
  }
}
