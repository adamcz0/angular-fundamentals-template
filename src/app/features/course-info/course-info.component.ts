import { Component, Input, OnInit } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Observable } from 'rxjs';
import { Course } from '@app/services/userModel';
import {CoursesStateFacade} from 'src/app/store/courses/courses.facade'

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  courseId: string = '';
  course$!: Observable<Course | null>;

  authorNames: string[] = [];
 
  constructor(
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute,
    private coursesStateFacade: CoursesStateFacade
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
      
      if (this.courseId) {
        this.coursesStateFacade.getAllCourses();
        this.coursesStateFacade.getSingleCourse(this.courseId)
        this.course$ = this.coursesStateFacade.course$;
      }
    });
    
    /*this.course$.authors.forEach(authorId => {
      this.coursesStoreService.getAuthorById(authorId).subscribe({
        next: value => this.authorNames.push(value)
      })
    })*/
  }
}
