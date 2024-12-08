import { Component } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addstate',
  standalone: false,
  
  templateUrl: './addstate.component.html',
  styleUrl: './addstate.component.css'
})
export class AddstateComponent {
  stateForm!: FormGroup;
  states: any[] = [];
  isFormVisible: boolean = false; // Variable to control form visibility

  constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.stateForm = this.fb.group({
      name: ['', Validators.required]
    });
    this.loadStates();
  }

  loadStates(): void {
    this.apiService.getStates().subscribe(data => {
      this.states = data;  // Store the fetched states in the `states` array
    });
  }

  addState(): void {
    if (this.stateForm.valid) {
      this.apiService.addState(this.stateForm.value).subscribe(response => {
        alert('State added successfully');
        this.isFormVisible = false; // Hide form after adding
        this.loadStates();
      }, error => {
        alert('Error adding state');
      });
    }
  }

  editState(state: any): void {
    this.stateForm.patchValue({
      name: state.name
    });
    this.stateForm.addControl('id', this.fb.control(state.id));
    this.isFormVisible = true; // Show the form when editing
  }

  updateState(): void {
    if (this.stateForm.valid) {
      const updatedState = this.stateForm.value;
      this.apiService.updateState(updatedState).subscribe(response => {
        alert('State updated successfully');
        this.isFormVisible = false; // Hide form after updating
        this.loadStates();
      }, error => {
        alert('Error updating state');
      });
    }
  }

  deleteState(stateId: number): void {
    if (confirm('Are you sure you want to delete this state?')) {
      this.apiService.deleteState(stateId).subscribe(response => {
        alert('State deleted successfully');
        this.loadStates();
      }, error => {
        alert('Error deleting state');
      });
    }
  }

  // Toggle the visibility of the Add State form
  toggleStateForm(): void {
    this.isFormVisible = !this.isFormVisible;
    if (!this.isFormVisible) {
      this.stateForm.reset(); // Reset form when it's hidden
    }
  }

  // Go Back to the previous page (e.g., dashboard)
  goBack(): void {
    this.router.navigate(['/admins']);
  }
}