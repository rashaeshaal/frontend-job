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

  // Create the job form with validations
  createJobForm(): void {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary_min: ['', [Validators.required]],
      salary_max: ['', [Validators.required]],
      industry_id: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
    });
  }

  // Load job details by ID for editing
  loadJobData(): void {
    this.apiService.getJobById(this.jobId).subscribe(
      (response) => {
        this.jobData = response.job;
        this.jobForm.patchValue({
          title: this.jobData?.title,
          description: this.jobData?.description,
          salary_min: this.jobData?.salary_min,
          salary_max: this.jobData?.salary_max,
          industry_id: this.jobData?.industry,
          role_id: this.jobData?.role
        });
      },
      (error) => {
        console.error('Error fetching job details:', error);
      }
    );
  }

  // Load industries for the dropdown
  loadIndustries(): void {
    this.apiService.getIndustries().subscribe((industries) => {
      this.industries = industries;
    });
  }

  // Method to fetch roles when an industry is selected
  onIndustryChange(event: Event): void {
    const industryId = (event.target as HTMLSelectElement).value;
    if (industryId) {
      this.apiService.getRolesByIndustry(industryId).subscribe((roles) => {
        this.roles = roles;
        this.jobForm.patchValue({ role_id: '' });
      });
    } else {
      this.roles = [];
    }
  }

  // Submit the form to update the job
  updateJob(): void {
    if (this.jobForm.valid) {
      const jobData = {
        job_title: this.jobForm.value.title,
        job_description: this.jobForm.value.description,
        salary_min: this.jobForm.value.salary_min,
        salary_max: this.jobForm.value.salary_max,
        industry_id: this.jobForm.value.industry_id,
        role_id: this.jobForm.value.role_id
      };

      this.apiService.updateJob(this.jobId, jobData).subscribe(
        (response) => {
          console.log('Job updated successfully:', response);
          this.router.navigate(['/job-list']); // Navigate back to the job list
        },
        (error) => {
          console.error('Error updating job:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}