import { Component, DestroyRef, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  signUpForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }),
    firstName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/[a-z]+/i)],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required, Validators.pattern(/[a-z]+/i)],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/[a-z]+/i)],
      }),
      number: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/[1-9]+/)],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/[1-9]+/)],
      }),
      city: new FormControl('', {
        validators: [Validators.required, Validators.pattern(/[a-z]+/i)],
      }),
    }),
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('employee'),
    agree: new FormControl<boolean>(false, {
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    console.log(this.signUpForm);
  }
  onReset() {
    this.signUpForm.reset();
  }
}
