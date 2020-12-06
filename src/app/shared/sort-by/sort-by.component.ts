import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {

  @Input() items: string[];

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  changeArrowDirection(): void {
    this.arrowDown = !this.arrowDown;
  }

}
