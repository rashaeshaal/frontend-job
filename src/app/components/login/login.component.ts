import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  // Easy access to form controls
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      
      // Call the API to log in the user
      this.apiService.loginUser(this.loginForm.value).subscribe(
        response => {
          console.log('Login Successful', response);

          // Store the token in localStorage
          localStorage.setItem('authToken', response.token); // Store the token here

          // You can redirect the user after login
          this.router.navigate(['/home']);  // Example redirect
        },
        error => {
          console.error('Login Failed', error);
          // Show error message to the user
        }
      );
    }
  }
}