import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import * as eva from 'eva-icons';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit, AfterViewInit {

  @Input() items: string[];

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  changeArrowDirection(): void {
    this.arrowDown = !this.arrowDown;
  }

}
