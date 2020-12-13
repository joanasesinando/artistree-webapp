import {AfterViewInit, Component, Input, OnInit} from '@angular/core';

import * as eva from 'eva-icons';
import {Router} from '@angular/router';
import {AlertService} from '../../../_util/alert.service';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss']
})
export class OverviewCardComponent implements OnInit, AfterViewInit {

  @Input() item: any;
  @Input() isCourse?: boolean;
  @Input() isPaying?: boolean;
  @Input() marginTop: boolean;
  @Input() marginTopOnMobile: boolean;

  constructor(private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  goToBooking(): void {
    this.router.navigate(['/gig/' + this.item.id + '/book']);
  }

  goToEnrol(): void {
    this.router.navigate(['/course/' + this.item.id + '/enrol']);
  }

  pay(): void {
    if (this.isCourse) {
      this.alertService.showAlert('Enrollment Successful', 'Thank you for your purchase! You can now start learning through this course.', 'success');
      this.router.navigate(['/course/' + this.item.id]);

    } else {
      this.alertService.showAlert('Enrollment Successful', 'Thank you for your purchase! You can now start learning through this course.', 'success');
      this.router.navigate(['/gig/' + this.item.id]);
    }
  }

}
