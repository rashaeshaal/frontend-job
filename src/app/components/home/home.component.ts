import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Job } from '../../model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: false,
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  jobs: Job[] = []; // Full list of jobs from the API
  filteredJobs: Job[] = []; // Filtered list of jobs
  industries: string[] = []; // List of industries for the filter
  roles: string[] = []; // List of roles for the filter
  allRoles: string[] = []; // Full list of roles before filtering
  selectedIndustry: string = ''; // Selected industry for the filter
  selectedRole: string = ''; // Selected role for the filter

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadJobs();
    this.loadIndustries();
    this.loadRoles();
  }

  // Load all jobs from the backend
  loadJobs(): void {
    this.apiService.getJobss().subscribe((data: any) => {
      this.jobs = data.jobs;
      this.filteredJobs = [...this.jobs]; // Default filtered list is the full list
    });
  }

  // Load the list of industries from the backend
  loadIndustries(): void {
    this.apiService.getIndustries().subscribe((industries: any[]) => {
      this.industries = industries.map((industry) => industry.name);
    });
  }

  // Load the full list of roles from the backend (for all industries)
  loadRoles(): void {
    this.apiService.getRoles().subscribe((roles: any[]) => {
      this.allRoles = roles.map((role) => role.name); // Store all roles as a master list
      this.roles = [...this.allRoles]; // Initially show all roles
    });
  }

  // Filter the job list based on the selected industry and role
  filterJobs(): void {
    // Reset the filtered list to the full jobs list
    this.filteredJobs = this.jobs;

    // Filter by selected industry
    if (this.selectedIndustry) {
      this.filteredJobs = this.filteredJobs.filter(
        (job) => job.industry === this.selectedIndustry
      );
      // Update roles based on selected industry
      const jobsInIndustry = this.jobs.filter(
        (job) => job.industry === this.selectedIndustry
      );
      this.roles = [...new Set(jobsInIndustry.map((job) => job.role))]; // Unique roles
    }

    // Further filter by selected role
    if (this.selectedRole) {
      this.filteredJobs = this.filteredJobs.filter(
        (job) => job.role === this.selectedRole
      );
    }
  }

  applyForJob(job: Job): void {
    console.log(`Applying for job: ${job.title}`);
    this.router.navigate(['/apply', job.id]); // Pass the job ID as a route parameter
  }
}
