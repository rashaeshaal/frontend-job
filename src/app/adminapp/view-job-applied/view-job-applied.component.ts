import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-job-applied',
  standalone: false,
  
  templateUrl: './view-job-applied.component.html',
  styleUrl: './view-job-applied.component.css'
})
export class ViewJobAppliedComponent implements OnInit {
  jobApplications: any[] = []; // Store all job applications
  statuses: string[] = ['Applied', 'Interview', 'Hired']; // Possible status options

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobApplications(); // Load all job applications on component load
  }

  // Load job applications from API
  loadJobApplications(): void {
    this.apiService.getJobApplications().subscribe(
      (response: any) => {
        this.jobApplications = response;
      },
      (error) => {
        console.error('Error loading job applications', error);
      }
    );
  }

  // Update status for a specific job application
  updateStatus(applicationId: number, newStatus: string): void {
    this.apiService.updateJobApplicationStatus(applicationId, newStatus).subscribe(
      (response: any) => {
        console.log('Status updated successfully', response);
        alert(`Status updated to ${newStatus}`); // Show success message
        this.loadJobApplications(); // Reload the job applications to reflect changes
      },
      (error) => {
        console.error('Error updating status', error);
      }
    );
  }
  goBackHome(): void {
    this.router.navigate(['/admins']); // Redirect to the home page
  }
}