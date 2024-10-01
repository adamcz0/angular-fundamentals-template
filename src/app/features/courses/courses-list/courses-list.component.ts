import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { mockedCoursesList } from '@app/mock';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Observable } from 'rxjs';
import { Course } from 'src/app/services/userModel';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;

  constructor(private coursesStoreService: CoursesStoreService) {}

  ngOnInit(): void {
    this.courses$ = this.coursesStoreService.courses$;
    this.isLoading$ = this.coursesStoreService.isLoading$;

    this.coursesStoreService.getAll();
  }

/*

  @Input() editable: boolean = true;
  @Output() showCourse: EventEmitter<string> = new EventEmitter();
  @Output() editCourse: EventEmitter<string> = new EventEmitter();
  @Output() deleteCourse: EventEmitter<string> = new EventEmitter();*/

  dateType(date: string): Date {
    return new Date(date);
  }
}
