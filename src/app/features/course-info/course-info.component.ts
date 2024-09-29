import { Component, Input, OnInit } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  course: any;
  title: string;
  description: string;
  id: string;
  creationDate: Date;
  duration: number;
  authors: string[];

  getAuthorNames(authorIds: string[]): string[] {
    return authorIds.map(authorId => {
      const authors = mockedAuthorsList.find(author => author.id === authorId);
      return authors? authors.name : '';
    }) 
  }

  courseId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.course = mockedCoursesList.find(c=> c.id === this.courseId);
    this.title = this.course.title;
    this.description = this.course.description;
    this.id = this.course.id;
    this.creationDate = this.course.creationDate;
    this.duration = this.course.duration;
    this.authors = this.course.authors;
  }
}
