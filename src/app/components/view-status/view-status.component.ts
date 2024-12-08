import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-view-status',
  standalone: false,
  
  templateUrl: './view-status.component.html',
  styleUrl: './view-status.component.css'
})
export class ViewStatusComponent implements OnInit {
  userJobApplications: any[] = []; // Store job applications for the user
  email: string = ''; // Email input from the user
  errorMessage: string = ''; // Display error message

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

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
}
