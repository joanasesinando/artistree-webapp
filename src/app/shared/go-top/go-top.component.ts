import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-go-top',
  templateUrl: './go-top.component.html',
  styleUrls: ['./go-top.component.scss']
})
export class GoTopComponent implements OnInit {

  goTopBtn;

  constructor() { }

  ngOnInit(): void {
    this.goTopBtn = document.getElementById('goTopBtn');
  }

  goTop(): void {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    // Show go-to-top button
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ?
      this.goTopBtn.style.display = 'block' : this.goTopBtn.style.display = 'none';
  }

}
