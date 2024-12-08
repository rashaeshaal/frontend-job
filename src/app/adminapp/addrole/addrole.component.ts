import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';
@Component({
  selector: 'app-addrole',
  standalone: false,
  
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.css'
})
export class AddroleComponent implements OnInit {
  roleForm!: FormGroup;
  industries: any[] = [];
  roles: any[] = [];

  constructor(private fb: FormBuilder, private apiService: ApiService) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required]],
      industry_id: ['', [Validators.required]]
    });
    this.loadIndustries();
    this.loadRoles();
  }

  loadIndustries(): void {
    this.apiService.getIndustries().subscribe(data => {
      this.industries = data;
    });
  }

  loadRoles(): void {
    this.apiService.getRoles().subscribe(data => {
      this.roles = data;
    });
  }

  addRole(): void {
    if (this.roleForm.valid) {
      this.apiService.addRole(this.roleForm.value).subscribe(() => {
        this.loadRoles();
        this.roleForm.reset();
      });
    }
  }
}