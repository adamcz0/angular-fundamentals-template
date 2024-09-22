import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { DurationPipe } from 'src/app/shared/pipes/duration.pipe'

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})

export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  submitted = false;

  courseForm = this.fb.group({
    title: ['', [Validators.minLength(2), Validators.required]],
    description: ['', [Validators.minLength(2), Validators.required]],
    author: [''],
    authors: this.fb.array([]),
    courseAuthors: this.fb.array([]),
    duration: [[], [Validators.min(0), Validators.required]]
  })

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
