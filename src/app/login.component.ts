import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;

  loading = false;
  error: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;
    const { username, password } = this.form.value;
    this.auth.login(username!, password!).subscribe(user => {
      this.loading = false;
      if (user) {
        this.router.navigateByUrl('/');
      } else {
        this.error = 'Usuario o contraseña incorrectos.';
      }
    }, () => {
      this.loading = false;
      this.error = 'Error al validar credenciales.';
    });
  }

  goToDo() {
    this.router.navigateByUrl('/proximamente');
  }
}
