import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page">
      <div class="card">
        <h1>Login</h1>
        <p class="subtitle">Sign in to your account</p>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" [(ngModel)]="email" placeholder="you@example.com" autocomplete="email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" [(ngModel)]="password" placeholder="••••••••" autocomplete="current-password" />
        </div>

        <button class="btn btn-primary" (click)="login()">Login</button>

        @if (error) {
          <div class="error-msg">{{ error }}</div>
        }

        <p class="footer-link">
          No account? <a routerLink="/signup">Sign up</a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.error = '';
    if (!this.email.trim() || !this.password) {
      this.error = 'Email and password are required';
      return;
    }
    this.auth.login({ email: this.email.trim(), password: this.password }).subscribe({
      next: (user) => {
        this.auth.saveUser(user);
        this.router.navigate(['/profile']);
      },
      error: (e) => (this.error = e.error?.message || 'Login failed'),
    });
  }
}
