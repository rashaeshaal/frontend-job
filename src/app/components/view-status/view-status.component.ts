import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-status',
  standalone: false,
  
  templateUrl: './view-status.component.html',
  styleUrl: './view-status.component.css'
})
export class ViewStatusComponent implements OnInit {
  userJobApplications: any[] = []; // Store job applications for the user
  email: string = ''; // Email input from the user
  errorMessage: string = '';
  userData: any = {};
  loginUserID!: number;
  loginUserType!: number;
  receivedData: any; // Display error message

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
      this.loginUserID = this.userData.loginUserID;
      this.loginUserType = this.userData.userType;
      console.log('Logged-in User:', this.userData);
    } else {
      console.log('No user data found in localStorage');
      // Handle the case when no user data is found (e.g., redirect to login page)
      this.router.navigate(['/handlelogin']);
    }
  }

  // Load all job applications for the user with the provided email
  loadUserJobApplications(): void {
    if (!this.email) {
      this.errorMessage = 'Please enter an email address.';
      return;
    }

    this.apiService.getUserJobApplications(this.email).subscribe(
      (response: any) => {
        this.userJobApplications = response;
        this.errorMessage = ''; // Clear error message
      },
      (error) => {
        console.error('Error loading job applications', error);
        this.errorMessage = error.error?.error || 'An error occurred.';
      }
    );
  }

  goBackHome(): void {
    this.router.navigate(['/home']); // Redirect to the home page
  }
}