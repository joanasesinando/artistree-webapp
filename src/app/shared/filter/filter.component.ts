import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() name: string;
  @Input() items: {name: string, total: number}[];
  @Input() marginRight?: boolean;
  @Input() type: string;

  arrowDown = true;

  min: number;
  max: number;

  constructor() { }

  ngOnInit(): void {
  }

  changeArrowDirection(): void {
    this.arrowDown = !this.arrowDown;
  }

  formatNumberWithCommas(n: number): string {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  submitBudget(): void {
    // TODO
  }

}
