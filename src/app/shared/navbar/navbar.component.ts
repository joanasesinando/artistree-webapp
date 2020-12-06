import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import * as eva from 'eva-icons';
import {Router} from '@angular/router';
import {FirebaseAuthService} from '../../_services/authentication/firebase-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  toggler;
  menu;
  header;
  mobile;

  search;

  user = {
    name: 'John Doe',
    photoUrl: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1'
  };

  @ViewChild('form', { static: false }) form: NgForm;

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit(): void {
    this.toggler = document.getElementById('toggler');
    this.menu = document.getElementById('toggle-menu');
    this.header = document.getElementById('header');
    this.mobile = document.getElementById('mobile');
  }

  ngAfterViewInit(): void {
    eva.replace();
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
    this.mobile.setAttribute('style', 'position: relative; top: 120px;');
    this.menu.style.display = 'block';
    document.body.setAttribute('style', 'overflow: hidden');
  }

  closeMenu(): void {
    this.toggler.classList.remove('is-active');
    this.header.removeAttribute('style');
    this.mobile.removeAttribute('style');
    this.menu.style.display = 'none';
    document.body.removeAttribute('style');
  }

  doSearch(): void {
    this.router.navigate(['/search/' + this.search]);
  }

  hasMessages(): boolean {
    // TODO
    return false;
  }

  hasNotifications(): boolean {
    // TODO
    return true;
  }

  logout(): void {
    this.firebaseAuthService.logout();
  }

}
