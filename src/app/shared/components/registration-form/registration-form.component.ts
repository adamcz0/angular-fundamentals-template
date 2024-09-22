import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  submitted = false;

  registrationForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.registrationForm.valid) {
      this.submitted = true;
    }
  }
  // Use the names `name`, `email`, `password` for the form controls.
}