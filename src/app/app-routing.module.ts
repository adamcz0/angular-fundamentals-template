import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';

export const routes: Routes = [
    /* Add your code here */
    { 
        path: 'login', 
        loadChildren: () => import('src/app/shared/components/login-form/login.module').then(m => m.LoginModule),
       // canActivate: [NotAuthorizedGuard]
    },
    { 
        path: 'registration', 
        loadChildren: () => import('src/app/shared/components/registration-form/registration.module').then(m => m.RegistrationModule),
        //canActivate: [NotAuthorizedGuard]
    },
    {
        path: 'courses',
        loadChildren: () => import('src/app/features/courses/courses-list/courses-list.module').then(m => m.CoursesModule),
      //  canLoad: [AuthorizedGuard],
      //  canActivate: [AuthorizedGuard]
    },
    { 
        path: '', 
        redirectTo: '/courses', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: '/courses', 
        pathMatch: 'full' 
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
