import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';


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

  constructor(private fb: FormBuilder, private apiService: ApiService) {
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
      industry_id: ['', [Validators.required]],
      role_id: ['', [Validators.required]],
    });
  }

  // Method to fetch roles when an industry is selected
  onIndustryChange(event: Event): void {
    const industryId = (event.target as HTMLSelectElement).value;
    if (industryId) {
      // Fetch roles specific to the selected industry
      this.apiService.getRolesByIndustry(industryId).subscribe((roles) => {
        this.roles = roles;  // Update roles based on selected industry
        this.jobForm.patchValue({ role_id: '' });  // Reset the role field
      });
    } else {
      this.roles = [];  // Clear roles if no industry is selected
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
          this.jobForm.reset();  // Reset the form after submission
        },
        (error) => {
          console.error('Error creating job:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
