import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AuthResponse } from 'src/app/shared/auth-response.model';
import { Credentials } from 'src/app/shared/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  deniedAccess = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: Credentials = {
        email: this.loginForm.value.email,
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };

      this.authenticationService.login(credentials).subscribe(
        (response: AuthResponse) => {
          if (response) {
            localStorage.setItem('token', response.accessToken as string);
            this.router.navigate(['/admin']);
          }
        },
        (error: any) => {
          this.deniedAccess = true;
        }
      );
    }
  }

  onChanged() {
    this.deniedAccess = false;
  }
}
