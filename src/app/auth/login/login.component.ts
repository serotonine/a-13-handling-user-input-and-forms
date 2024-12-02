import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  errorMsg!:string;
  onChange(pwd:NgModel){
    console.log(pwd.value);
  }
  onSubmit(formData:NgForm){
    console.log('[LoginComponent on submit form]');
    console.log(formData);
    const _form = formData.form;
    if(_form.invalid){
      return;
    }
    //

    const emailInput = formData.form.value.email;
    const pwdInput = formData.form.value.password;
  }
}
