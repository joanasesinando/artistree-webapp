import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {FirebaseService} from '../../../_services/firebase.service';

import * as eva from 'eva-icons';
import * as $ from 'jquery';
import {User} from '../../../_domain/User';

@Component({
  selector: 'app-highlights-card',
  templateUrl: './highlights-card.component.html',
  styleUrls: ['./highlights-card.component.scss']
})
export class HighlightsCardComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: User;

  newHighlight: { title: string, description: string, color: string } = { title: '', description: '', color: '' };

  colors: string[] = ['pink', 'purple', 'blue', 'green'];

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  selectColor(color: string): void {
    this.newHighlight.color = color;
    $('.color.selected').removeClass('selected');
    $('.color.' + color).addClass('selected');
  }

  createHighlight(): void {
    if (this.newHighlight.title !== '' && this.newHighlight.description !== '' && this.newHighlight.color !== '') {

      if (!this.user.highlights) this.user.highlights = [];

      this.user.highlights.push({
        title: this.newHighlight.title,
        description: this.newHighlight.description,
        color: this.newHighlight.color
      });

      this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
        highlights: this.user.highlights
      });

      this.newHighlight.title = '';
      this.newHighlight.description = '';
      this.newHighlight.color = '';
    }
  }

  deleteHighlight(highlight: { title: string, description: string, color: string }): void {
    for (let i = 0; i < this.user.highlights.length; i++) {
      const h = this.user.highlights[i];
      if (h.title === highlight.title && h.description === highlight.description) {
        this.user.highlights.splice(i, 1);
      }
    }

    this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
      highlights: this.user.highlights
    });
  }

}
