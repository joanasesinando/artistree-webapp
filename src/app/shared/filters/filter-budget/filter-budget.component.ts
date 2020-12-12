import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-filter-budget',
  templateUrl: './filter-budget.component.html',
  styleUrls: ['./filter-budget.component.scss']
})
export class FilterBudgetComponent implements OnInit {

  @Input() marginRight: boolean;

  @Output() budgetApplied = new EventEmitter<string>();

  minValue = '';
  maxValue = '';

  arrowDown = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(): void {
    $('.filter-budget .dropdown-menu').toggle();
    this.minValue = '';
    this.maxValue = '';
  }

  addInvalidStyle(): void {
    $('#filterBudgetMin').addClass('is-invalid');
    $('#filterBudgetMax').addClass('is-invalid');
    $('#minMax').css('display', 'block');
  }

  removeInvalidStyle(): void {
    $('#filterBudgetMin').removeClass('is-invalid');
    $('#filterBudgetMax').removeClass('is-invalid');
    $('#minMax').css('display', 'none');
  }

  onBudgetApplied(): void {
    if (this.minValue !== '' && this.maxValue !== '' && this.maxValue <= this.minValue) {
      const min = this.minValue;
      const max = this.maxValue;

      this.addInvalidStyle();
      this.minValue = min;
      this.maxValue = max;
      return;
    }

    this.removeInvalidStyle();
    this.budgetApplied.emit(this.minValue + '-' + this.maxValue);
    this.toggleMenu();
    this.arrowDown = !this.arrowDown;
  }

}
