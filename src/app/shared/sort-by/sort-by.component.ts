import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit, AfterViewInit {

  @Input() items: string[];
  @Input() selectedItem: string;
  @Input() marginBottom: string;

  @Output() itemSelected = new EventEmitter<string>();

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  onItemSelected(item): void {
    this.selectedItem = item;
    this.itemSelected.emit(item);
  }

}
