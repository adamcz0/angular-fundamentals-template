import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute,Router } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CourseFormComponent } from './course-form.component';
import { OnInit } from '@angular/core';
import { mockedCoursesList } from '@app/mock';

const routes: Routes = [
  { path: '', component: CourseFormComponent }, 
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class CourseFormModule implements OnInit{
  courseId!: string;
  course: any;  
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.course = mockedCoursesList.find(c => c.id === this.courseId); // Get the course
  }

}