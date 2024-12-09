import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Job } from '../../model/model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-job',
  standalone: false,
  
  templateUrl: './edit-job.component.html',
  styleUrl: './edit-job.component.css'
})
export class EditJobComponent implements OnInit {
  jobForm!: FormGroup;
  jobId: number;
  jobData: Job | undefined;

  industries: any[] = [];
  roles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.jobId = +this.route.snapshot.paramMap.get('jobId')!;  // Get jobId from URL
  }

  ngOnInit(): void {
    this.createJobForm();
    this.loadJobData();
    this.loadIndustries();
  }

  createJobForm(): void {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required]], // Job title
      description: ['', [Validators.required]], // Job description
      salary_min: ['', [Validators.required]], // Minimum salary
      salary_max: ['', [Validators.required]], // Maximum salary
      industry: ['', [Validators.required]], // Industry name
      role_id: ['', [Validators.required]], // Role ID
    });

    this.jobForm.get('industry')?.valueChanges.subscribe((industry) => {
      if (industry) {
        this.loadRolesByIndustry(industry); // Fetch roles based on selected industry
      } else {
        this.roles = [];
        this.jobForm.patchValue({ role_id: '' });
      }
    });
  }

  loadJobData(): void {
    this.apiService.getJobById(this.jobId).subscribe(
      (response) => {
        this.jobData = response.job;
        this.jobForm.patchValue({
          title: this.jobData?.title,
          description: this.jobData?.description,
          salary_min: this.jobData?.salary_min,
          salary_max: this.jobData?.salary_max,
          industry: this.jobData?.industry,
          role_id: this.jobData?.role
        });

        if (this.jobData?.industry) {
          this.loadRolesByIndustry(this.jobData.industry);
        }
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
  }

  loadIndustries(): void {
    this.apiService.getIndustries().subscribe(
      (industries) => {
        this.industries = industries;
      },
      (error) => {
        console.error('Error loading industries:', error);
      }
    );
  }

  loadRolesByIndustry(industry: string): void {
    this.apiService.getRolesByIndustry(industry).subscribe(
      (roles) => {
        this.roles = roles;
      },
      (error) => {
        console.error('Error loading roles for industry:', industry, error);
      }
    );
  }



  updateJob(): void {
    if (this.jobForm.valid) {
      const jobData = {
        job_title: this.jobForm.value.title,
        job_description: this.jobForm.value.description,
        salary_min: this.jobForm.value.salary_min,
        salary_max: this.jobForm.value.salary_max,
        industry: this.jobForm.value.industry,
        role_id: this.jobForm.value.role_id // Ensure role_id is numeric
      };
  
      this.apiService.updateJob(this.jobId, jobData).subscribe(
        (response) => {
          console.log('Job updated successfully:', response);
          this.router.navigate(['/job-list']);
        },
        (error) => {
          console.error('Error updating job:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
    goBack(): void {
    this.router.navigate(['/admins']);
  }
}