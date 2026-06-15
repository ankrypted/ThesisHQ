import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  fullName = '';
  username = '';
  email = '';
  password = '';
  stage = '';
  field = '';

  error = signal<string | null>(null);
  loading = signal(false);

  stages = [
    { value: 'year-1', label: 'Year 1' },
    { value: 'year-2', label: 'Year 2' },
    { value: 'year-3', label: 'Year 3' },
    { value: 'year-4', label: 'Year 4' },
    { value: 'year-5', label: 'Year 5' },
    { value: 'year-6', label: 'Year 6+' },
    { value: 'postdoc', label: 'Postdoc' },
    { value: 'faculty', label: 'Faculty' },
  ];

  constructor(private auth: AuthService, private router: Router) {}

  get canSubmit(): boolean {
    return (
      this.fullName.trim().length > 0 &&
      this.username.trim().length >= 3 &&
      !!this.email &&
      this.password.length >= 8
    );
  }

  submit() {
    if (!this.canSubmit) return;

    this.loading.set(true);
    this.error.set(null);

    this.auth.register({
      full_name: this.fullName.trim(),
      username: this.username.trim(),
      email: this.email.trim(),
      password: this.password,
      stage: this.stage || undefined,
      field: this.field.trim() || undefined,
    }).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.loading.set(false);
        this.error.set(err?.error?.detail ?? 'Registration failed. Please try again.');
      }
    });
  }
}
