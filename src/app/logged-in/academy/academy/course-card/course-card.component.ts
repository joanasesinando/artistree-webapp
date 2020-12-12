import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../_domain/Course';
import {Router} from '@angular/router';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {

  @Input() course: Course;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  formatText(max: number, text: string): string {
    if (text.length > max) return text.substr(0, max) + '...';
    return text;
  }

  goToCourse(): void {
    this.router.navigate(['/course', this.course.id]);
  }

}
