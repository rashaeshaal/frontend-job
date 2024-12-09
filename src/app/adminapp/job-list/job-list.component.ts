import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Job } from '../../model/model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-list',
  standalone: false,
  
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements OnInit {
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
    this.apiService.getJobs().subscribe((data: any) => {
      this.jobs = data.jobs;
      this.filteredJobs = [...this.jobs]; // Default filtered list is the full list
    });
  }

  // Load the list of industries from the backend
  loadIndustries(): void {
    this.apiService.getIndustries().subscribe((industries: any[]) => {
      this.industries = industries.map(industry => industry.name);
    });
  }

  // Load the full list of roles from the backend (for all industries)
  loadRoles(): void {
    this.apiService.getRoles().subscribe((roles: any[]) => {
      this.allRoles = roles.map(role => role.name); // Store all roles as a master list
      this.roles = [...this.allRoles]; // Initially show all roles
    });
  }

  // Filter the job list and roles based on the selected industry and role
  filterJobs(): void {
    // Reset the filtered list to the full jobs list
    this.filteredJobs = this.jobs;

    // Filter roles based on the selected industry
    if (this.selectedIndustry) {
      // Filter roles that correspond to the selected industry
      const jobsInIndustry = this.jobs.filter(job => job.industry === this.selectedIndustry);
      this.roles = [...new Set(jobsInIndustry.map(job => job.role))]; // Extract unique roles from the jobs
      this.selectedRole = ''; // Reset role selection when the industry changes

      // Filter jobs by the selected industry
      this.filteredJobs = jobsInIndustry;
    } else {
      // If no industry is selected, show all roles
      this.roles = [...this.allRoles];
    }

    // Further filter jobs by the selected role
    if (this.selectedRole) {
      this.filteredJobs = this.filteredJobs.filter(job => job.role === this.selectedRole);
    }
  }

  // Edit job action
  editJob(jobId: number): void {
    this.router.navigate(['/edit-job', jobId]);
  }

  // Delete job action
  deleteJob(jobId: number): void {
    this.apiService.deleteJob(jobId).subscribe(() => {
      this.loadJobs(); 
    });
  }
  goBack(): void {
    this.router.navigate(['/admins']);
  }
}