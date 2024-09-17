import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  courses = mockedCoursesList;
  @Input() title: string;
  @Input() description: string;
  @Input() creationDate: Date;
  @Input() duration: number;
  @Input() authors: string[];
  @Input() editable: boolean = true;
  @Output() onClickShow: EventEmitter<string> = new EventEmitter();

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
