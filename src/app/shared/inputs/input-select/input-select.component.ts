import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent implements OnInit {

  @Input() id: string;
  @Input() placeholder: string;
  @Input() options: string[];
  @Input() icon: string;
  @Input() iconType: string;
  @Input() required: boolean;
  @Input() marginTop: string;

  @Output() valueChange = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onChange(): void {
    // @ts-ignore
    this.valueChange.emit(document.getElementById(this.id).value);
  }

}
