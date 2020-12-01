import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  toggler;
  menu;
  header;

  constructor() { }

  ngOnInit(): void {
    this.toggler = document.getElementById('toggler');
    this.menu = document.getElementById('toggle-menu');
    this.header = document.getElementById('header');
  }

  toggleMenu(): void {
    if (this.toggler.classList.contains('is-active')) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu(): void {
    this.toggler.classList.add('is-active');
    this.header.setAttribute('style', 'height: 291px; background-color: white; box-shadow: 0 16px 48px #e3e7eb; position: fixed');
    this.menu.style.display = 'block';
    document.body.setAttribute('style', 'overflow: hidden');
  }

  closeMenu(): void {
    this.toggler.classList.remove('is-active');
    this.header.removeAttribute('style');
    this.menu.style.display = 'none';
    document.body.removeAttribute('style');
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    // Sticky header
    const header = document.getElementById('header');
    if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  }

}
