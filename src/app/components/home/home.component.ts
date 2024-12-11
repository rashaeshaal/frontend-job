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
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  industries: string[] = [];
  roles: string[] = [];
  allRoles: string[] = [];
  selectedIndustry: string = '';
  selectedRole: string = '';
  userData: any = {};
  loginUserID!: number;
  loginUserType!: number;
  receivedData: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userData = JSON.parse(storedUser);
      this.loginUserID = this.userData.loginUserID;
      this.loginUserType = this.userData.userType;
      console.log('Logged-in User:', this.userData);
    } else {
      console.log('No user data found in localStorage');
      this.router.navigate(['/handlelogin']);
    }

    this.loadJobs();
    this.loadIndustries();
    this.loadRoles();
  }

  loadJobs(): void {
    this.apiService.getJobss().subscribe(
      (data: any) => {
        this.jobs = data.jobs || [];
        this.filteredJobs = [...this.jobs];
      },
      (error) => {
        console.error('Error loading jobs:', error);
      }
    );
  }

  loadIndustries(): void {
    this.apiService.getIndustries().subscribe(
      (industries: any[]) => {
        this.industries = industries.map((industry) => industry.name);
      },
      (error) => {
        console.error('Error loading industries:', error);
      }
    );
  }

  loadRoles(): void {
    this.apiService.getRoles().subscribe(
      (roles: any[]) => {
        this.allRoles = roles.map((role) => role.name);
        this.roles = [...this.allRoles];
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }

  filterJobs(): void {
    this.filteredJobs = this.jobs;

    if (this.selectedIndustry) {
      this.filteredJobs = this.filteredJobs.filter(
        (job) => job.industry === this.selectedIndustry
      );

      const jobsInIndustry = this.jobs.filter(
        (job) => job.industry === this.selectedIndustry
      );

      this.roles = [...new Set(jobsInIndustry.map((job) => job.role))];
    } else {
      this.roles = [...this.allRoles];
    }

    if (this.selectedRole) {
      this.filteredJobs = this.filteredJobs.filter(
        (job) => job.role === this.selectedRole
      );
    }
  }

  applyForJob(job: Job): void {
    console.log(`Applying for job: ${job.title}`);
    this.router.navigate(['/apply', job.id]);
  }
}