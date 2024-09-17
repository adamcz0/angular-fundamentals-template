import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/mock';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() courses: {}[];
  @Input() editable: boolean = true;

  @Output() showCourse: EventEmitter<string> = new EventEmitter();
  @Output() editCourse: EventEmitter<string> = new EventEmitter();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();
}
