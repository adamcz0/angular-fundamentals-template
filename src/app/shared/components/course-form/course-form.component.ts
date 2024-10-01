import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe'
import { Router, ActivatedRoute } from '@angular/router';
import { mockedCoursesList } from '@app/mock';
import { mockedAuthorsList } from '@app/mock';
import { Course } from '@app/services/userModel';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})

export class CourseFormComponent implements OnInit {
  constructor(
      public fb: FormBuilder, 
      public library: FaIconLibrary,
      private route: ActivatedRoute,
      private router: Router,
      private coursesStoreService: CoursesStoreService) {
    library.addIconPacks(fas);
  }

  course$!: Course;
  submitted = false;
  courseId: string = '';
  isEditing: boolean = false;
  authorNames: string[] = [];

  courseForm = this.fb.group({
    title: ['', [Validators.minLength(2), Validators.required]],
    description: ['', [Validators.minLength(2), Validators.required]],
    author: [''],
    authors: this.fb.array([]),
    courseAuthors: this.fb.array(['']),
    duration: [0, [Validators.min(0), Validators.required]]
  })

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = params.get('id') || '';
      this.isEditing = !!this.courseId;

      if (this.courseId) {
        this.coursesStoreService.getCourse(this.courseId).subscribe({
          next: value => {
            this.course$ = value;
            
            value.authors.forEach(authorId => {
              this.coursesStoreService.getAuthorById(authorId).subscribe({
                next: value => this.authorNames.push(value)
              })
            })
          
            this.courseForm.patchValue({
              title: this.course$.title,
              description: this.course$.description,
              duration: this.course$.duration,
              courseAuthors: this.course$.authors
            });
          }
        })
      }
    });
  }

  createAuthor(): void {
    const authorControl = this.courseForm.get('author');
    if (authorControl && authorControl.value) {
      this.authors.push(new FormControl(authorControl.value));
      authorControl.reset();
    }
  }

  deleteAuthor(index: number): void {
    this.authors.removeAt(index);
  }

  deleteCourseAuthor(index: number): void {
    this.authors.push(new FormControl(this.courseAuthors.at(index).value))
    this.courseAuthors.removeAt(index);
  }


  get authors() {
    return this.courseForm.get('authors') as FormArray;
  }

  addAuthor(author: string, index: number): void{
    const courseAuthorControl = this.courseForm.get('courseAuthors') as FormArray;
    if (courseAuthorControl && !courseAuthorControl.controls.some(control => control.value === author)) {
      this.courseAuthors.push(new FormControl(author));
      this.authors.removeAt(index);
    }
  }

  get courseAuthors() {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  onSubmit():void {
    if (this.courseForm.valid) {
      this.submitted = true;
    }
  }
  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
