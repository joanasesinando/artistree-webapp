import {Component, HostListener, OnInit} from '@angular/core';
import {FirebaseAuthService} from '../../_services/authentication/firebase-auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../_util/alert.service';

@Component({
  selector: 'app-navbar-homepage',
  templateUrl: './navbarHomepage.component.html',
  styleUrls: ['./navbarHomepage.component.scss']
})
export class NavbarHomepageComponent implements OnInit {

  toggler;
  menu;
  header;

  constructor(private router: Router,
              private firebaseAuthService: FirebaseAuthService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.toggler = document.getElementById('toggler2');
    this.menu = document.getElementById('toggle-menu2');
    this.header = document.getElementById('header2');
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

  goTo(): void {
    if (!this.firebaseAuthService.isUserLoggedIn) {
      this.alertService.showAlert('Hold on a minute', 'Sign in to Artistree to see this content.', 'warning');
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {

    // Sticky header
    if (document.body.scrollTop > 15 || document.documentElement.scrollTop > 15) {
      this.header.classList.add('sticky');
    } else {
      this.header.classList.remove('sticky');
    }
  }

}
