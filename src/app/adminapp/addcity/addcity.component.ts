import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-addcity',
  standalone: false,
  
  templateUrl: './addcity.component.html',
  styleUrl: './addcity.component.css'
})
export class AddcityComponent {
  cityForm!: FormGroup;
  states: any[] = [];
  cities: any[] = [];
  editingCityId: number | null = null;  // Store the ID of the city being edited

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      state_id: ['', Validators.required]
    });

    // Load states for the select dropdown
    this.apiService.getStates().subscribe(response => {
      this.states = response;
    });
  }

  loadCities(stateId: number): void {
    this.apiService.getCities(stateId).subscribe(response => {
      console.log('Cities response:', response);  // Log the response
      if (Array.isArray(response)) {
        this.cities = response;  
      } else {
        console.error('Expected an array of cities, but got:', response);
      }
    }, error => {
      console.error('Error fetching cities:', error);
    });
  }
  

  onStateChange(): void {
    const stateId = this.cityForm.get('state_id')?.value;
    console.log('Selected State ID:', stateId);
    if (stateId) {
      this.loadCities(stateId);
    }
  }
  

  // Add City
  addCity(): void {
    if (this.cityForm.valid) {
      if (this.editingCityId) {
        // If editing, update the city
        this.apiService.updateCity(this.editingCityId, this.cityForm.value).subscribe(response => {
          alert('City updated successfully');
          this.router.navigate(['/admin-dashboard']);
        }, error => {
          alert('Error updating city');
        });
      } else {
        // If adding, create a new city
        this.apiService.addCity(this.cityForm.value).subscribe(response => {
          alert('City added successfully');
          this.router.navigate(['/admins']);
        }, error => {
          alert('Error adding city');
        });
      }
    }
  }
  

  // Edit City
  editCity(cityId: number): void {
    console.log('Edit button clicked for cityId:', cityId);  // Debug log
    const city = this.cities.find(c => c.id === cityId);
    if (city) {
      console.log('City found:', city);  // Log the found city
      this.cityForm.patchValue({
        name: city.name,
        state_id: city.state ? city.state.id : null  // Check if state is defined
      });
      this.editingCityId = city.id;
    } else {
      console.error('City not found', cityId);  // Debug log if city is not found
    }
  }
  

  
  
  
  

  // Delete City
  deleteCity(cityId: number): void {
    if (confirm('Are you sure you want to delete this city?')) {
      this.apiService.deleteCity(cityId).subscribe(response => {
        alert('City deleted successfully');
        this.cities = this.cities.filter(city => city.id !== cityId);  // Remove the city from the list
      }, error => {
        alert('Error deleting city');
      });
    }
  }

  // Go Back
  goBack(): void {
    this.router.navigate(['/admins']);  // Or use history.goBack() if you want to go back to the previous page
  }
}