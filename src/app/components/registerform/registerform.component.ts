import { Component,OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators , ValidationErrors, AbstractControl} from '@angular/forms';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import  moment from 'moment';


@Component({
  selector: 'app-registerform',
  standalone: false,
  
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent implements OnInit {
  registerForm!: FormGroup;
  states: any[] = [];
  cities: any[] = [];
  loading = false;
  submitted = false;

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+={}|:;,.<>?/-]).*$')
      ]],
      confirm_password: ['', Validators.required],
      gender: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: ['', [Validators.required]],
      date_of_birth: ['', [Validators.required, this.ageValidator]],
      profile_picture: ['', []],
      terms_and_conditions: [false, [Validators.requiredTrue]],
    }, { validators: this.passwordMatchValidator });

    // Load states
    this.apiService.getStates().subscribe(
      (states) => {
        this.states = states;
      },
      (error) => {
        console.error('Error fetching states:', error);
      }
    );
  }
  ageValidator(control: AbstractControl): ValidationErrors | null {
    const dob = control.value;
    const minAge = 18;
    const today = moment();
    const birthDate = moment(dob);
    const age = today.diff(birthDate, 'years');

    return age >= minAge ? null : { minAge: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  // Password Match Validator
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirm_password = group.get('confirm_password')?.value;
    return password === confirm_password ? null : { passwordMismatch: true };
  }

  // Method to fetch cities based on selected state
  onStateChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const stateId = Number(target.value);

    if (!isNaN(stateId)) {
      this.apiService.getCities(stateId).subscribe(
        (cities) => {
          this.cities = cities;
        },
        (error) => {
          console.error('Error fetching cities:', error);
        }
      );
    }
  }

 
  register(): void {
    this.submitted = true;
  
    
    console.log('Form Invalid:', this.registerForm.invalid);
  
    if (this.registerForm.invalid) {
      return;
    }
  
    this.loading = true;
    this.apiService.registerUser(this.registerForm.value).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        this.router.navigate(['/handlelogin']);
      },
      (error) => {
        console.error('Error registering user:', error);
        this.loading = false;
      }
    );
  }
  

  resetForm(): void {
    this.registerForm.reset();
  }
}
