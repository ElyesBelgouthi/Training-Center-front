import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../shared/auth-response.model';
import { Observable } from 'rxjs';
import { Credentials } from '../shared/credentials.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private baseURL: string = 'http://localhost:3000/auth';
  private jwtToken!: string;

  constructor(private http: HttpClient) {}

  login(credentials: Credentials) {
    return this.http.post<AuthResponse>(this.baseURL + '/signin', credentials);
  }

  getAdmin() {
    return this.http.get<any>(this.baseURL);
  }
  updateAdmin(formData: FormData) {
    return this.http.patch(this.baseURL + '/update', formData).subscribe();
  }
}
