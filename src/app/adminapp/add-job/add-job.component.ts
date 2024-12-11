import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  standalone: false,
  
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent {
  jobForm!: FormGroup;
  industries: any[] = [];
  roles: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
    this.createJobForm();
  }

  ngOnInit(): void {
    // Fetch industries and roles when component initializes
    this.apiService.getIndustries().subscribe((industries) => {
      this.industries = industries;
    });
  }

  createJobForm(): void {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      salary_min: ['', [Validators.required]],
      salary_max: ['', [Validators.required]],
      industry_id: ['', [Validators.required]],  // Make sure it's industry_id not name
      role_id: ['', [Validators.required]], 
    });
  }

  // Method to fetch roles when an industry is selected
  onIndustryChange(event: Event): void {
    const industryId = parseInt((event.target as HTMLSelectElement).value, 10); // Get industry_id
    console.log('Selected Industry ID:', industryId);  // Check if industryId is correct
    if (industryId) {
      this.apiService.getRolesByIndustryy(industryId).subscribe((roles) => {
        console.log('Fetched Roles:', roles);  // Check if API is returning roles
        this.roles = roles;
        this.jobForm.patchValue({ role_id: '' }); // Clear role field
      }, (error) => {
        console.error('Error fetching roles:', error);
      });
    } else {
      this.roles = [];
    }
  }

  addJob(): void {
    if (this.jobForm.valid) {
      const jobData = {
        job_title: this.jobForm.value.title,
        job_description: this.jobForm.value.description,
        salary_min: this.jobForm.value.salary_min,
        salary_max: this.jobForm.value.salary_max,
        industry_id: this.jobForm.value.industry_id,
        role_id: this.jobForm.value.role_id
      };

      this.apiService.addJob(jobData).subscribe(
        (response) => {
          console.log('Job created successfully:', response);
          this.jobForm.reset();
          this.router.navigate(['/admins']);   
        },
        (error) => {
          console.error('Error creating job:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

  goBackHome(): void {
    this.router.navigate(['/admins']);
  }
}
