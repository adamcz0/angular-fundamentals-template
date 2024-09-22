import { Component, Input, Output } from '@angular/core';
import { mockedCoursesList } from '@app/mock';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  courseList = mockedCoursesList;
  @Input() isLoggedIn: boolean = false;
  title = 'courses-app';
}