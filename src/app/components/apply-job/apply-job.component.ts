import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { HttpErrorResponse } from '@angular/common/http';
interface JobApplicationResponse {
  message: string;
}

@Component({
  selector: 'app-apply-job',
  standalone: false,
  
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css'
})
export class ApplyJobComponent implements OnInit {
  applyForm!: FormGroup;
  jobId!: number;
  jobDetails: any;

  constructor(
    private fb: FormBuilder, 
    private apiService: ApiService, 
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJobDetails();

    // Initialize the apply form with an email field
    this.applyForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]], // Email field
      resume: [null, [Validators.required]] // Resume field
    });
  }

  loadJobDetails(): void {
    this.apiService.getJobById(this.jobId).subscribe(
      (data: any) => {
        this.jobDetails = data.job;
      },
      (error) => {
        console.error('Error loading job details', error);
      }
    );
  }

  get f() {
    return this.applyForm.controls;
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.applyForm.patchValue({ resume: file });
    }
  }

  onSubmit(): void {
    if (this.applyForm.valid) {
      const formData = new FormData();
      formData.append('resume', this.applyForm.value.resume);
      formData.append('job_posting_id', this.jobId.toString());
      formData.append('email', this.applyForm.value.email); // Send email with form data

      this.apiService.applyForJob(formData).subscribe(
        (response) => {
          console.log('Application submitted successfully', response);
          alert('Application submitted successfully!');
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error submitting application', error);
          alert('Error submitting application. Please try again.');
        }
      );
    }
  }
}