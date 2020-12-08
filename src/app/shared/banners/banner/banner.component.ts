import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() imgUrl: string;
  @Input() title: string;
  @Input() description: string;
  @Input() textColor: string;

  constructor() { }

  ngOnInit(): void {
  }

}
