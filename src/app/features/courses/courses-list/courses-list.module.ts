import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesListComponent } from './courses-list.component';
import { CourseFormComponent } from '@app/shared/components';
import { CourseInfoComponent } from '@app/features/course-info/course-info.component';
import { CommonModule } from '@angular/common';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { AdminGuard } from '@app/user/guards/admin.guard';

const routes: Routes = [
  { 
    path: '', 
    component: CoursesListComponent 
  },
  { 
    path: 'add',
    component: CourseFormComponent,
    //canActivate: [AuthorizedGuard, AdminGuard]
  },
  { 
    path: ':id', 
    component: CourseInfoComponent,
    //canActivate: [AuthorizedGuard]
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    //canActivate: [AuthorizedGuard, AdminGuard]
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