import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent, RegistrationFormComponent } from './shared/components';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    /* Add your code here */
    { path: 'register', component: RegistrationFormComponent },
    { path: 'login', component: LoginFormComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
