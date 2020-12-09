import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {IUser} from '../../../_domain/User';
import {FirebaseService} from '../../../_services/firebase.service';
import * as eva from 'eva-icons';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.scss']
})
export class DescriptionCardComponent implements OnInit, AfterViewInit {

  @Input() isCurrent: boolean;
  @Input() user: IUser;

  newSkill: string;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    eva.replace();
  }

  deleteSkill(skillToDelete: string): void {
    const skills: string[] = [];

    for (const skill of this.user.skills) {
      if (skill !== skillToDelete)
        skills.push(skill);
    }
    this.user.skills = skills;

    // Update database
    if (this.user.type === 'artist') {
      this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, { skills });
    }
  }

  updateDescription(): void {
    this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
      bio: this.user.bio
    });
  }

  updateSkills(): void {
    if (this.newSkill !== '') {
      this.user.skills.push(this.newSkill);

      // Update database
      if (this.user.type === 'artist') {
        this.firebaseService.setDatabaseData('users/artists/' + this.user.uid, {
          skills: this.user.skills
        });
      }

      this.newSkill = '';
    }
  }

}
