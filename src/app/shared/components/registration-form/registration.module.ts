import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegistrationFormComponent } from './registration-form.component';

const routes: Routes = [
  { path: '', component: RegistrationFormComponent }, 
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class RegistrationModule {}