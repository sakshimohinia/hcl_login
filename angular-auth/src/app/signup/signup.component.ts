import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <div class="page">
      <div class="card">
        <h1>Sign Up</h1>
        <p class="subtitle">Create a new account</p>

        <div class="form-group">
          <label for="name">Name</label>
          <input id="name" type="text" [(ngModel)]="name" placeholder="Your name" autocomplete="name" />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" type="email" [(ngModel)]="email" placeholder="you@example.com" autocomplete="email" />
        </div>

        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" type="password" [(ngModel)]="password" placeholder="••••••••" autocomplete="new-password" />
        </div>

        <button class="btn btn-primary" (click)="signup()">Sign Up</button>

        @if (error) {
          <div class="error-msg">{{ error }}</div>
        }

        <p class="footer-link">
          Already have an account? <a routerLink="/login">Login</a>
        </p>
      </div>
    </div>
  `,
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  signup() {
    this.error = '';
    if (!this.email.trim() || !this.password) {
      this.error = 'Email and password are required';
      return;
    }
    this.auth.signup({
      name: this.name.trim(),
      email: this.email.trim(),
      password: this.password,
    }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (e) => (this.error = e.error?.message || 'Signup failed'),
    });
  }
}
