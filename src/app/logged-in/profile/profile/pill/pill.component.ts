import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss']
})
export class PillComponent implements OnInit {

  @Input() label: string;
  @Input() marginRight: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
