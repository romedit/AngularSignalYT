import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthUser } from 'src/app/types/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authForm: FormGroup
  constructor(private readonly authService: AuthService) {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      saveUser: new FormControl(true)
    })
  }

  onSubmit() {
    if (this.authForm.valid)
      this.authService.signIn(this.authForm.value as IAuthUser)
  }

  cancelForm() {
    this.authForm.reset()
  }
}
