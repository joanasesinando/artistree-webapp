import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

import * as $ from 'jquery';

import 'node_modules/bootstrap/js/dist/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss']
})
export class JoinModalComponent implements OnInit {

  email: string;
  password: string;

  checkboxes1 = [
    {
      label: 'Acrobatics',
      checked: false
    },
    {
      label: 'Architecture',
      checked: false
    },
    {
      label: 'Comedy',
      checked: false
    },
    {
      label: 'Dance',
      checked: false
    },
    {
      label: 'Drawing',
      checked: false
    },
    {
      label: 'Magic',
      checked: false
    },
    {
      label: 'Painting',
      checked: false
    },
    {
      label: 'Sculpting',
      checked: false
    },
    {
      label: 'Video',
      checked: false
    }
  ];

  checkboxes2 = [
    {
      label: 'Acting',
      checked: false
    },
    {
      label: 'Ceramics',
      checked: false
    },
    {
      label: 'Crafts',
      checked: false
    },
    {
      label: 'Design',
      checked: false
    },
    {
      label: 'Films',
      checked: false
    },
    {
      label: 'Music',
      checked: false
    },

    {
      label: 'Photography',
      checked: false
    },
    {
      label: 'Theatre',
      checked: false
    }
  ];

  @ViewChild('form1', { static: false }) form1: NgForm;
  @ViewChild('form2', { static: false }) form2: NgForm;
  @ViewChild('form3', { static: false }) form3: NgForm;

  type;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  continueToStep2(): void {
    if (!this.form1.form.valid) {
      return;
    }

    this.closeModal('joinModal-step1');
    this.openModal('joinModal-step2');
  }

  continueToStep3(): void {
    if (!this.form2.form.valid) {
      return;
    }

    this.closeModal('joinModal-step2');
    this.openModal('joinModal-step3');
  }

  continueToStep4(type: string): void {
    this.type = type;
    this.closeModal('joinModal-step3');
    this.openModal('joinModal-step4');
  }

  finishJoining(): void {
    this.closeModal('joinModal-step4');
    this.router.navigate(['/app']);

    for (const checkbox of this.checkboxes1) {
      if (checkbox.checked) {
        checkbox.checked = false;
        console.log(checkbox.label);
      }
    }

    for (const checkbox of this.checkboxes2) {
      if (checkbox.checked) {
        checkbox.checked = false;
        console.log(checkbox.label);
      }
    }
    this.email = '';
    this.password = '';
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
