import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  @Input() label: string;
  @Input() id: string;
  @Input() marginRight: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
