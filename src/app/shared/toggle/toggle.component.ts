import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() label: string;
  @Input() id: string;
  @Input() marginRight: boolean;

  @Output() toggleChanged = new EventEmitter<boolean>();

  checked = true;

  constructor() { }

  ngOnInit(): void {
  }

  onToggleChanged(): void {
    this.toggleChanged.emit(this.checked);
  }

}
