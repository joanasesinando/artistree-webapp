import {AfterViewInit, EventEmitter, Component, Input, OnInit, Output} from '@angular/core';
import {NgModel} from '@angular/forms';

import * as eva from 'eva-icons';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss']
})
export class InputEmailComponent implements OnInit, AfterViewInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() value: string;
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
