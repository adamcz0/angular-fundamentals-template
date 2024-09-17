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

  getFormattedDuration(duration: number): string {
    const hours = Math.floor(duration/60);
    const minutes = duration % 60;
    return `${hours}:${minutes} hours`
  }

  getFormattedDate(creationDate: string): string {
    const date = new Date(creationDate)
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.getMonth().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`
  }
}
