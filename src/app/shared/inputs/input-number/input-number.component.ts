import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() icon: string;
  @Input() iconType: string;
  @Input() value: string;
  @Input() pattern: string;
  @Input() required: boolean;
  @Input() marginTop: string;

  @Output() valueChange = new EventEmitter<string>();
  @Output() validityChange = new EventEmitter<boolean>();

  enter = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  enterPressed(): void {
    this.enter = true;
  }

  onValidityChange(input: NgModel): void {
    return this.validityChange.emit(input.valid);
  }

}
