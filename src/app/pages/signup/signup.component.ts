import { IAuthUser } from './../../types/user.interface';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm: FormGroup
  minPwLength = 6

  constructor(private readonly authService: AuthService) {
    this.signUpForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, Validators.minLength(this.minPwLength)]),
      confirmPassword: new FormControl("", [Validators.required, Validators.minLength(this.minPwLength)])
    })
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formData = this.signUpForm.value
      delete formData['confirmPassword']
      this.authService.signUp(formData)
    }
  }

  onReset() {
    this.signUpForm.reset()
  }

}
