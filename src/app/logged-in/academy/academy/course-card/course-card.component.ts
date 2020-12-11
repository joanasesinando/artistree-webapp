import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../_domain/Course';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }

  formatText(max: number, text: string): string {
    if (text.length > max) return text.substr(0, max) + '...';
    return text;
  }

}
