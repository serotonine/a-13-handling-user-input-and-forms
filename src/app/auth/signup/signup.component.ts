import { Component, DestroyRef, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
function equalValues(cn1: string, cn2: string) {
  return (control: AbstractControl) => {
    const control1 = control.get(cn1)?.value;
    const control2 = control.get(cn2)?.value;
    if (control1 === control2) {
      return null;
    }
    return { notEqual: true };
  };
}

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
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
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
    if (this.signUpForm.invalid) {
      return;
    }
    console.log(this.signUpForm);
  }
  onReset() {
    this.signUpForm.reset();
  }
}
