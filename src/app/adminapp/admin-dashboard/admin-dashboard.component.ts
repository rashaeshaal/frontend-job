import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Job , JobResponse} from '../../model/model';
@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit {
  jobs: Job[] = [];
  jobForm!: FormGroup;  // Non-null assertion operator
  industries: string[] = ['Industry 1', 'Industry 2']; // Mock data, replace with real data
  roles: string[] = ['Role 1', 'Role 2']; // Mock data, replace with real data

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadJobs();
    this.createJobForm();  // Initialize the form on component load
  }

  // Initialize the form group with validation
  createJobForm(): void {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary_min: ['', [Validators.required]],
      salary_max: ['', [Validators.required]],
      industry: ['', [Validators.required]],
      role: ['', [Validators.required]],
      posted_by: ['', [Validators.required]],
    });
  }

  loadJobs(): void {
    this.apiService.getJobs().subscribe((data: JobResponse) => {
      this.jobs = data.jobs;
    });
  }

  addJob(jobData: any): void {
    this.apiService.addJob(jobData).subscribe(() => {
      this.loadJobs(); // Reload jobs after adding
      this.jobForm.reset(); // Reset the form after submission
    });
  }

  updateJob(jobId: number, jobData: any): void {
    this.apiService.updateJob(jobId, jobData).subscribe(() => {
      this.loadJobs(); // Reload jobs after updating
    });
  }

  deleteJob(jobId: number): void {
    this.apiService.deleteJob(jobId).subscribe(() => {
      this.loadJobs(); // Reload jobs after deletion
    });
  }

  filterJobsByIndustry(industry: string): void {
    this.apiService.getJobs({ industry }).subscribe((data: JobResponse) => {
      this.jobs = data.jobs;
    });
  }

  filterJobsByRole(role: string): void {
    this.apiService.getJobs({ role }).subscribe((data: JobResponse) => {
      this.jobs = data.jobs;
    });
  }
}