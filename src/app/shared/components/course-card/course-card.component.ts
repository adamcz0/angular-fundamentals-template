import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() course: any;
  @Input() title: string;
  @Input() description: string;
  @Input() creationDate: Date;
  @Input() duration: number;
  @Input() authors: string[];
  @Input() editable: boolean = true;
  @Input() id: string;
  @Output() onClickShow: EventEmitter<string> = new EventEmitter();

  getAuthorNames(authorIds: string[]): string[] {
    return authorIds.map(authorId => {
      const authors = mockedAuthorsList.find(author => author.id === authorId);
      return authors? authors.name : '';
    }) 
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
  
  navigateToCourseDetails(): void {
    if (this.course && this.course.id) {
      this.router.navigate(['/courses', this.course.id]);
    }
  }

  onEdit(): void {
    if (this.course && this.course.id) {
      this.router.navigate(['/courses/edit', this.course.id]);
    }
  }
}
