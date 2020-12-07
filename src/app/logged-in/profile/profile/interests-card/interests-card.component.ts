import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-interests-card',
  templateUrl: './interests-card.component.html',
  styleUrls: ['./interests-card.component.scss']
})
export class InterestsCardComponent implements OnInit {

  @Input() interests: string[];

  constructor() { }

  ngOnInit(): void {
  }

}
