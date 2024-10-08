import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from "@angular/forms";
import { Validator } from "@angular/forms";

@Directive({
    selector: '[emailValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: EmailValidatorDirective,
        multi: true,
       }]
})


export class EmailValidatorDirective implements Validator{
    // Add your code here
    validate(control: AbstractControl): ValidationErrors | null {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (control.value && !emailPattern.test(control.value)) {
            return { invalidEmail: true };
          }
          return null;
      }
}
