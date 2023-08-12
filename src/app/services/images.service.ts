import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  baseURL: string = `http://localhost:3000/`;

  getImage(id: number): Observable<Blob> {
    const url = `${this.baseURL}instructor/photo/${id}`; //
    return this.http.get(url, { responseType: 'blob' });
  }
}
