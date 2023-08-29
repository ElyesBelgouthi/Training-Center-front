import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}

  baseURL: string = `http://localhost:3000/`;

  getImage(id: string, type: string): Observable<Blob> {
    const url = `${this.baseURL}${type}/photo/${id}`; //
    return this.http.get(url, { responseType: 'blob' });
  }
}
