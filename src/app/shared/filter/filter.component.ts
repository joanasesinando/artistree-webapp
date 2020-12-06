import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() name: string;
  @Input() items: {name: string, total: number}[];

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeArrowDirection(): void {
    this.arrowDown = !this.arrowDown;
  }

}
