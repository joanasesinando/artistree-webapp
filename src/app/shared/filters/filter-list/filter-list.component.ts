import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-filter-list',
  templateUrl: './filter-list.component.html',
  styleUrls: ['./filter-list.component.scss']
})
export class FilterListComponent implements OnInit {

  @Input() name: string;
  @Input() items: {name: string, total: number}[];
  @Input() selectedItem: string;
  @Input() marginRight: boolean;

  @Output() itemSelected = new EventEmitter<string>();

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  onItemSelected(item): void {
    if (!item.classList.contains('dropdown-item'))
      item = item.parentElement;

    $('.selected').removeClass('selected');
    item.classList.add('selected');

    this.itemSelected.emit(item.id);
  }
}
