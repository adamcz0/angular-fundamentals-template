import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginFormComponent } from './login-form.component';

const routes: Routes = [
  { path: '', component: LoginFormComponent }, 
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule {}