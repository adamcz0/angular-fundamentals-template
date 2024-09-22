import { Component, Input } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  // Use the names for the input `course`.
  @Input() course = mockedCoursesList[0];
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
}
