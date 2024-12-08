import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-addindustry',
  standalone: false,
  
  templateUrl: './addindustry.component.html',
  styleUrl: './addindustry.component.css'
})
export class AddindustryComponent implements OnInit {
  industryForm!: FormGroup;
  industries: any[] = [];
  
  constructor(private fb: FormBuilder, private apiService: ApiService) {}
  
  ngOnInit(): void {
    this.industryForm = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.loadIndustries();
  }
  
  loadIndustries(): void {
    this.apiService.getIndustries().subscribe(data => {
      this.industries = data;
    });
  }
  
  addIndustry(): void {
    if (this.industryForm.valid) {
      this.apiService.addIndustry(this.industryForm.value).subscribe(() => {
        this.loadIndustries();
        this.industryForm.reset();
      });
    }
  }
}