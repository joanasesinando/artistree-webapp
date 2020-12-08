import {Component, OnInit} from '@angular/core';

import * as $ from 'jquery';
import 'node_modules/bootstrap/js/dist/modal';
import {Router} from '@angular/router';

import {FirebaseService} from '../../../_services/firebase.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit {

  email: string;
  password: string;

  form = {
    emailValid: false,
    passwordValid: false
  };

  rememberMe = true;

  constructor(private router: Router, private auth: FirebaseService) { }

  ngOnInit(): void {
  }

  isFormValid(): boolean {
    return this.form.emailValid && this.form.passwordValid;
  }

  signIn(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.closeModal('signinModal');
    this.auth.login(this.email, this.password).then(res => {
      if (res) {
        this.router.navigate(['/feed']);
      }
    });
  }

  join(): void {
    this.closeModal('signinModal');
    this.openModal('joinModal-step1');
  }

  closeModal(modalID: string): void {
    const modal = $('#' + modalID);
    const body = $('body');
    modal.removeClass('show');
    modal.hide();
    $('.modal-backdrop').remove();
    body.removeClass('modal-open');
    body.css('padding-right', '');
    modal.modal('hide');
  }

  openModal(modalID: string): void {
    const modal = $('#' + modalID);
    modal.modal('show');
  }
}
