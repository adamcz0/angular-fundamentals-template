import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { mockedCoursesList, mockedAuthorsList } from '@app/mock';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesStoreService } from '@app/services/courses-store.service';
@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent implements OnInit {
  @Input() course: any;
  @Input() title: string;
  @Input() description: string;
  @Input() creationDate: Date;
  @Input() duration: number;
  @Input() authors: string[];
  @Input() editable: boolean = true;
  @Input() id: string;
  @Input() isAdmin: boolean = true;
  @Output() onClickShow: EventEmitter<string> = new EventEmitter();

  authorNames: string[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private coursesStoreService: CoursesStoreService) {}

  ngOnInit(): void {
    if (this.authors && this.authors.length > 0) {
      this.authors.forEach(authorId => 
        this.coursesStoreService.getAuthorById(authorId).subscribe((authorName: string) => {
          this.authorNames.push(authorName)
        })
      )
    }
  }
  
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
