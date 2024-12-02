import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

// Custom validator.
function hasNumber(control: AbstractControl) {
  const hasN = /[0-9]+/.test(control.value);
  console.log(hasN);
  return hasN ? null : { valid: true };
}
// Custom Async Validator.
function isUniqueEmail(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    return of(null);
  }
  return of({ dupplicateEmail: true });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [isUniqueEmail],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), hasNumber],
    }),
  });
  get isInvalidEmail() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }
  get isInvalidPwd() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }
  onSubmit() {
    Object.entries(this.form.controls).map((item) =>
      console.log(item[1].value)
    );
    console.log(this.form.value);
    this.form.reset();
  }
}
