import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Job, JobResponse } from './model/model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8000/api';  

  constructor(private http: HttpClient) {}

  getStates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/states/`);
  }

 
  getCities(stateId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/citiesl/${stateId}/`);
  }

  registerUser(formData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, formData);
  }

  
  getJobs(params: any = {}): Observable<JobResponse> {  
    return this.http.get<JobResponse>(`${this.apiUrl}/jobs/`, { params });
  }
  getJobss(params: any = {}): Observable<JobResponse> {  
    return this.http.get<JobResponse>(`${this.apiUrl}/joblist/`, { params });
  }
  

  
  addJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs/`, jobData);
  }

  
  updateJob(jobId: number, jobData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/jobs/${jobId}/`, jobData);
  }

  
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${jobId}/`);
  }
  addState(stateData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-state/`, stateData);
  }

  
  addCity(cityData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-city/`, cityData);
  }
  addIndustry(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/industries/`, data);
  }
  addRole(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/roles/`, data);
  }
  getRoles(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/roles/`);
  }
  getRoless(industryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles/?industry=${industryId}`);
  }
  
  
  getIndustries(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/industries/`);
  }
  updateState(state: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/states/${state.id}/`, state);
  }
  getRolesByIndustry(industryId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/roles/?industry=${industryId}`);
  }
  

  deleteState(stateId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/states/${stateId}/`);  // This should match the endpoint in Django
  }
  updateCity(cityId: number, cityData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/citiesed/${cityId}/`, cityData);
  }
  
  deleteCity(cityId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/cities/${cityId}/`);
  }
  
  loginUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/handlelogin/`, credentials);
  }
  getJobById(jobId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/${jobId}/`);
  }
  applyForJob(formData: FormData): Observable<any> {  
    return this.http.post(`${this.apiUrl}/apply-job/`, formData);
  }
  getJobApplications() {
    return this.http.get<any[]>(`${this.apiUrl}/job-applications/`);
  }
  updateJobApplicationStatus(applicationId: number, status: string): Observable<any> {
    const url = `${this.apiUrl}/job-applications/${applicationId}/`;
    const body = { status: status };
    return this.http.put(url, body);
  }

  getUserJobApplications(email: string): Observable<any> {
    const url = `${this.apiUrl}/user-job-applications/?email=${encodeURIComponent(email)}`;
    return this.http.get(url);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/superuser-login/`, { username, password });
  }
  
  
}
  
  
  
  
  
   
