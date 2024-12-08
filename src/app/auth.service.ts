import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://your-backend-api-url'; // Replace with your actual API URL
  private currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}/login/`, { email, password })
      .subscribe(response => {
        if (response.user) {
          // Store user data in localStorage (or in a service state)
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        }
      });
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  logout() {
    // Remove user from localStorage
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
