import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // Save entered value to get them on reload.
  // Observable.
  private _form = viewChild.required<NgForm>('loginForm');
  private _destroyRef = inject(DestroyRef);
  constructor() {
    afterNextRender(() => {
      const storageData = window.localStorage.getItem('email');
      if (storageData) {
        const loadedData = JSON.parse(storageData);
        const loadedEmail = loadedData.email;
        /* this._form().setValue({
          email: loadedEmail,
          password:''}); */
        setTimeout(() => {
          this._form().controls['email'].setValue(loadedEmail);
        }, 1);
      }
      const subscription = this._form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) =>
            window.localStorage.setItem(
              'email',
              JSON.stringify({ email: value.email })
            ),
        });
      this._destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  onChange(pwd: NgModel) {
    console.log(pwd.value);
  }
  onSubmit(formData: NgForm) {
    console.log('[LoginComponent on submit form]');
    console.log(formData);
    const _form = formData.form;
    const emailInput = formData.form.value.email;
    const pwdInput = formData.form.value.password;
    // Lot of disponible functions.
    _form.reset();
  }
}
