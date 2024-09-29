import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesListComponent } from './courses-list.component';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '@app/features/course-info/course-info.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { 
    path: '', 
    component: CoursesListComponent 
  },
  { 
    path: 'add',
    component: CourseFormComponent
  },
  { 
    path: ':id', 
    component: CourseInfoComponent 
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class CoursesModule {}