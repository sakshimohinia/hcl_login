import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: `
    <div class="page">
      <div class="card">
        <h1>Profile</h1>
        <p class="subtitle">Your account details</p>

        @if (user) {
          <div class="profile-row">
            <span class="label">ID</span>
            <span class="value">{{ user.id }}</span>
          </div>
          <div class="profile-row">
            <span class="label">Name</span>
            <span class="value">{{ user.name || '—' }}</span>
          </div>
          <div class="profile-row">
            <span class="label">Email</span>
            <span class="value">{{ user.email }}</span>
          </div>
        } @else {
          <p class="subtitle">Loading…</p>
        }

        <button class="btn btn-secondary" (click)="logout()">Logout</button>
      </div>
    </div>
  `,
})
export class ProfileComponent implements OnInit {
  user: any;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    const saved = this.auth.currentUser();
    if (!saved) {
      this.router.navigate(['/login']);
      return;
    }
    this.auth.getUser(saved.id).subscribe({
      next: (u) => (this.user = u),
      error: () => {
        this.auth.logout();
        this.router.navigate(['/login']);
      },
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
