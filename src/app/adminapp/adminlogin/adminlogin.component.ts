import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-adminlogin',
  standalone: false,
  
  templateUrl: './adminlogin.component.html',
  styleUrl: './adminlogin.component.css'
})
export class AdminloginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: ApiService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.status === 'success') {
          this.router.navigate(['/admins']);  // Redirect to dashboard after successful login
        }
      },
      error => {
        this.errorMessage = 'Invalid credentials or not a superuser';
      }
    );
  }
}