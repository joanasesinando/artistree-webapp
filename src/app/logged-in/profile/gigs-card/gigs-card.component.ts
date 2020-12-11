import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../_domain/User';
import {Gig} from '../../../_domain/Gig';
import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-gigs-card',
  templateUrl: './gigs-card.component.html',
  styleUrls: ['./gigs-card.component.scss']
})
export class GigsCardComponent implements OnInit {

  @Input() isCurrent: boolean;
  @Input() user: User;

  newGig: Gig = { list: [], pitch: '', name: '', description: '', price: null, imagesURL: [] };

  newPrice: string;

  newListItem1: string;
  newListItem2: string;
  newListItem3: string;
  newListItem4: string;
  newListItem5: string;
  newListItem6: string;

  newPhoto1: string;
  newPhoto2: string;
  newPhoto3: string;
  newPhoto4: string;
  newPhoto5: string;
  newPhoto6: string;

  slideConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    centerMode: true,
    autoplay: true,
    infinite: true,
    autoplaySpeed: 3000,
    focusOnSelect: false,
    arrows: true,
    nextArrow: '<div *ngIf="this.user.gigs.length > 1" class="carousel-control-next"><div class="icon-wrapper"><i data-eva="arrow-forward-outline"></i></div></div>',
    prevArrow: '<div *ngIf="this.user.gigs.length > 1" class="carousel-control-prev"><div class="icon-wrapper"><i data-eva="arrow-back-outline"></i></div></div>',
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

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  createGig(): void {
    this.newGig.price = parseFloat(this.newPrice);

    if (this.newListItem1 && this.newListItem1 !== '') this.newGig.list.push(this.newListItem1);
    if (this.newListItem2 && this.newListItem2 !== '') this.newGig.list.push(this.newListItem2);
    if (this.newListItem3 && this.newListItem3 !== '') this.newGig.list.push(this.newListItem3);
    if (this.newListItem4 && this.newListItem4 !== '') this.newGig.list.push(this.newListItem4);
    if (this.newListItem5 && this.newListItem5 !== '') this.newGig.list.push(this.newListItem5);
    if (this.newListItem6 && this.newListItem6 !== '') this.newGig.list.push(this.newListItem6);

    this.newGig.imagesURL.push(this.newPhoto1);
    if (this.newPhoto2 && this.newPhoto2 !== '') this.newGig.imagesURL.push(this.newPhoto2);
    if (this.newPhoto3 && this.newPhoto3 !== '') this.newGig.imagesURL.push(this.newPhoto3);
    if (this.newPhoto4 && this.newPhoto4 !== '') this.newGig.imagesURL.push(this.newPhoto4);
    if (this.newPhoto5 && this.newPhoto5 !== '') this.newGig.imagesURL.push(this.newPhoto5);
    if (this.newPhoto6 && this.newPhoto6 !== '') this.newGig.imagesURL.push(this.newPhoto6);

    this.user.gigs.push({
      name: this.newGig.name,
      pitch: this.newGig.pitch,
      description: this.newGig.description,
      list: this.newGig.list.length !== 0 ? this.newGig.list : [],
      price: this.newGig.price,
      imagesURL: this.newGig.imagesURL
    });

    this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
      gigs: this.user.gigs
    });

    this.newGig = {description: '', imagesURL: [], name: '', pitch: '', price: 0};
  }

  deleteGig(gigToDelete: Gig): void {
    for (let i = 0; i < this.user.gigs.length; i++) {
      const gig = this.user.gigs[i];

      if (gig.name === gigToDelete.name && gig.pitch === gigToDelete.pitch && gig.description === gigToDelete.description &&
      gig.price === gigToDelete.price && gig.list === gigToDelete.list && gig.imagesURL === gigToDelete.imagesURL) {

        if (gig.rate && gigToDelete.rate && gig.rate !== gigToDelete.rate) return;

        this.user.gigs.splice(i, 1);
        this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
          gigs: this.user.gigs
        });
      }
    }
  }

}
