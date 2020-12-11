import {Component, Input, OnInit, Output, EventEmitter, AfterViewInit} from '@angular/core';

import * as $ from 'jquery';
import * as eva from 'eva-icons';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit, AfterViewInit {

  @Input() name: string;
  @Input() items: {name: string, total: number}[];
  @Input() selectedItem: string;
  @Input() rate?: boolean;
  @Input() marginRight: boolean;

  @Output() itemSelected = new EventEmitter<string>();

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  parseInt(n: string, radix: number): number {
    return parseInt(n, radix);
  }

  getRateArray(rate: number): any[] {
    const rateArray: boolean[] = [];
    for (let i = 0; i < rate; i++) {
      rateArray.push(true);
    }
    eva.replace();
    return rateArray;
  }

  onItemSelected(item): void {
    while (!item.classList.contains('dropdown-item'))
      item = item.parentElement;

    $('.selected').removeClass('selected');
    item.classList.add('selected');

    this.itemSelected.emit(item.id);
  }
}
