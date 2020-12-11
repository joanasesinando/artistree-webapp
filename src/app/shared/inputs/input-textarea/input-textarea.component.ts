import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() rows: number;
  @Input() icon: string;
  @Input() iconType: string;
  @Input() value: string;
  @Input() required: boolean;
  @Input() minLength: boolean;
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
