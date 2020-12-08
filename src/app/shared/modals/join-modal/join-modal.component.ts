import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';

import {FirebaseService} from '../../../_services/firebase.service';
import {AlertService} from '../../../_util/alert.service';

import * as $ from 'jquery';
import 'node_modules/bootstrap/js/dist/modal';

const categories = require('src/assets/data/categories.json').categories;

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss']
})
export class JoinModalComponent implements OnInit {

  user: {
    email: string,
    password: string,
    name: string,
    handler: string,
    avatar: string,
    interests: string[],
    artisticAreas?: string[],
    title: string,
    type: string,
    joiningTimestamp: number
    // tslint:disable-next-line:max-line-length
  } = { email: '', password: '', name: '', handler: '', avatar: '', interests: [], artisticAreas: [], title: '', type: '', joiningTimestamp: null};

  @ViewChild('form1', { static: false }) form1: NgForm;
  @ViewChild('form2', { static: false }) form2: NgForm;
  @ViewChild('form3', { static: false }) form3: NgForm;
  @ViewChild('form4', { static: false }) form4: NgForm;
  @ViewChild('form5', { static: false }) form5: NgForm;
  @ViewChild('form6', { static: false }) form6: NgForm;

  interestsCheckboxes: { label: string, checked: boolean }[] = [];
  artisticAreasCheckboxes: { label: string, checked: boolean }[] = [];

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.initializeCheckboxes();
  }

  initializeCheckboxes(): void {
    for (const category of categories) {
      this.interestsCheckboxes.push({ label: category, checked: false });
      this.artisticAreasCheckboxes.push({ label: category, checked: false });
    }
  }

  continueToStep2(): void {
    if (!this.form1.form.valid) return;

    this.firebaseService.emailAlreadyExists(this.user.email).then(exists => {
      if (exists) {
        this.alertService.showAlert('Oops!', 'It seems like this email is already registered on Artistree. Sign in instead.', 'danger');
        return;
      }
      this.closeModal('joinModal-step1');
      this.openModal('joinModal-step2');
    });
  }

  continueToStep3(): void {
    if (!this.form2.form.valid) return;

    this.closeModal('joinModal-step2');
    this.openModal('joinModal-step3');
  }

  continueToStep4(): void {
    if (!this.form3.form.valid) return;

    this.firebaseService.handlerAlreadyExists(this.user.handler).then(exists => {
      if (exists) {
        this.alertService.showAlert('Oops!', 'It seems like this handler is already in use. Please choose another one.', 'danger');
        return;
      }
      this.closeModal('joinModal-step3');
      this.openModal('joinModal-step4');
    });
  }

  continueToStep5(type: string): void {
    this.user.type = type;
    this.closeModal('joinModal-step4');
    this.openModal('joinModal-step5');
  }

  continueToStep6(): void {
    if (!this.form4.form.valid) return;
    if (this.user.type === 'regular') return this.join('joinModal-step5');

    this.closeModal('joinModal-step5');
    this.openModal('joinModal-step6');
  }

  continueToStep7(): void {
    if (!this.form5.form.valid) return;
    this.closeModal('joinModal-step6');
    this.openModal('joinModal-step7');
  }

  finish(): void {
    if (!this.form6.valid) return;
    if (this.user.type === 'artist') return this.join('joinModal-step7');
  }

  join(from: string): void {
    this.closeModal(from);
    const interests = this.getInterests();
    const artisticAreas = this.getArtisticAreas();

    if (this.user.type === 'regular') {
      this.firebaseService.signup(this.user.type, this.user.email, this.user.password, this.user.name,
        this.user.handler, this.user.avatar, interests, Date.now())
        .then(() => this.router.navigate(['/feed']));

    } else if (this.user.type === 'artist') {
      this.firebaseService.signup(this.user.type, this.user.email, this.user.password, this.user.name,
        this.user.handler, this.user.avatar, interests, Date.now(), artisticAreas, this.user.title)
        .then(() => this.router.navigate(['/feed']));
    }

    // Reset
    this.user = {
      email: '',
      password: '',
      name: '',
      handler: '',
      avatar: '',
      interests: [],
      artisticAreas: [],
      title: '',
      type: '',
      joiningTimestamp: null
    };
  }

  getInterests(): string[] {
    const interests: string[] = [];
    for (const checkbox of this.interestsCheckboxes) {
      if (checkbox.checked) {
        interests.push(checkbox.label);
      }
    }
    return interests;
  }

  getArtisticAreas(): string[] {
    const artisticAreas: string[] = [];
    for (const checkbox of this.artisticAreasCheckboxes) {
      if (checkbox.checked) {
        artisticAreas.push(checkbox.label);
      }
    }
    return artisticAreas;
  }

  signIn(from: number): void {
    from === 1 ? this.closeModal('joinModal-step1') : this.closeModal('joinModal-step2');
    this.openModal('signinModal');
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
