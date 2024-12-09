import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { ApiService } from '../../api.service';
import { HttpErrorResponse } from '@angular/common/http';
interface JobApplicationResponse {
  message: string;
  success: boolean; 
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
  loggedInUserEmail: string | null = null;
  userData: any = {};
  loginUserID!: number;
  loginUserType!: number;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.jobId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadJobDetails();
    this.applyForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], 
      resume: ['',Validators.required ]
    });


    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
      this.loginUserID = this.userData.id;
      this.loginUserType = this.userData.user_type;
      this.loggedInUserEmail = this.userData.email;  // Make sure to assign the email too
      console.log('Logged-in User:', this.userData);
    } else {
      console.log('No user data found in localStorage');
      // Redirect to login page if no user data is found
      this.router.navigate(['/hanlelogin']);
    }
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
  

  // Validate the file type of the resume
  validateFileType(control: AbstractControl): { [key: string]: boolean } | null {
    const file = control.value;
    if (file && file.type !== 'application/pdf') {
        return { invalidFileType: true };
    }
    return null;
}


onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  console.log(file)
  if (file) {
    this.applyForm.patchValue({
      resume: file  // Ensure you're updating the 'resume' form control, not 'profilePicture'
    });
    console.log('Selected file:', this.applyForm.get('resume')?.value);
    this.applyForm.get('resume')?.updateValueAndValidity();
  }
}


  

onSubmit(): void {
  if (this.applyForm.valid) {
    console.log('Form Data:', this.applyForm.value);  // Log form data to check if the file is attached
    
    // Create a new FormData object to send the file
    const formData = new FormData();
    formData.append('resume', this.applyForm.get('resume')?.value); // Append file to FormData
    formData.append('job_posting_id', this.jobId.toString());
    formData.append('email', this.loggedInUserEmail!);

    // Log FormData to check its contents
    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);  // Log each entry in FormData
    }

    this.apiService.applyForJob(formData).subscribe(
      (response: JobApplicationResponse) => {
        alert('Application submitted successfully!');
        this.applyForm.reset();
        this.router.navigate(['/home']);
      },
      (error: HttpErrorResponse) => {
        alert('Error submitting application. Please try again.');
        console.error(error);
      }
    );
  } else {
    alert('Please complete the form before submitting.');
  }
}

}  