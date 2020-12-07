import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import * as $ from 'jquery';
import 'node_modules/bootstrap/js/dist/modal';
import {Router} from '@angular/router';

import {FirebaseService} from '../../_services/authentication/firebase.service';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit {

  email: string;
  password: string;

  constructor(private router: Router, private auth: FirebaseService) { }

  @ViewChild('form', { static: false }) form: NgForm;

  rememberMe = false;

  ngOnInit(): void {
  }

  signIn(): void {
    if (!this.form.form.valid) {
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
