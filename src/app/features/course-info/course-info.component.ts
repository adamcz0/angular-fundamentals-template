import { Component, Input, OnInit } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '@app/services/courses.service';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { Observable } from 'rxjs';
import { Course } from '@app/services/userModel';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent implements OnInit {
  courseId: string = '';
  course$!: Course;

  authorNames: string[] = [];
 
  constructor(
    private coursesStoreService: CoursesStoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
      
      if (this.courseId) {
        this.coursesStoreService.getCourse(this.courseId).subscribe({
          next: value => {
            this.course$ = value;
            value.authors.forEach(authorId => {
              this.coursesStoreService.getAuthorById(authorId).subscribe({
                next: value => this.authorNames.push(value)
              })
            })
          }
        })
      }
    });
    
    this.course$.authors.forEach(authorId => {
      this.coursesStoreService.getAuthorById(authorId).subscribe({
        next: value => this.authorNames.push(value)
      })
    })
    /*this.coursesStoreService.getAuthorById(this.course$.authors[0]).subscribe({
      next: value => this.authorNames.push(value)
    })*/
  }
}
