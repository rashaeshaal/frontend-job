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

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get f() {
    return this.loginForm.controls;  
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);

    
      this.apiService.loginUser(this.loginForm.value).subscribe(
        response => {
          console.log('Login Successful', response);

          const loginUserID = response.user.id;  
          const userType = response.user.user_type || 1;  

         
          const idDict = { loginUserID: loginUserID, loginUserType: userType };
          const encodedData = encodeURIComponent(JSON.stringify(idDict));

        
          const userData = {
            id: loginUserID,
            email: response.user.email,
            full_name: response.user.full_name,
            user_type: userType,
          };
          localStorage.setItem('user', JSON.stringify(userData));

         
          this.router.navigate(['/home'], {
            queryParams: { data: encodedData },
            state: { userData: { loginUserID: loginUserID, loginUserType: userType } } 
          });
        },
        error => {
          console.error('Login Failed', error);
          alert('Login failed! Please check your credentials.');
        }
      );
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}