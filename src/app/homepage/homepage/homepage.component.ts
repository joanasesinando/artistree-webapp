import { Component, OnInit } from '@angular/core';
import {FirebaseService} from '../../_services/firebase.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private router: Router, private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

}
