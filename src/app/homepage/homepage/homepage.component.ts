import { Component, OnInit } from '@angular/core';
import {FirebaseAuthService} from '../../_services/authentication/firebase-auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private firebaseAuthService: FirebaseAuthService) { }

  ngOnInit(): void {
  }

}
