import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss']
})
export class InputPasswordComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Input() required: boolean;
  @Input() minLength: number;
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
