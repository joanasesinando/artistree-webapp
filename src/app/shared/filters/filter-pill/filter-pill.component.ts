import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-filter-pill',
  templateUrl: './filter-pill.component.html',
  styleUrls: ['./filter-pill.component.scss']
})
export class FilterPillComponent implements OnInit, AfterViewInit {

  @Input() label: string;
  @Input() type: string;
  @Input() marginRight: boolean;

  @Output() deleteClicked = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.type = this.type[0].toUpperCase() + this.type.substr(1);
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

}
