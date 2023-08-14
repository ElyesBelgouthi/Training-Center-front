import { EventEmitter, Injectable } from '@angular/core';
import { Instructor } from '../shared/Instructor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InstructorInfo } from '../shared/instructor-info.model';

@Injectable({ providedIn: 'root' })
export class InstructorsService {
  baseURL: string = `http://localhost:3000/instructor`;

  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseURL);
  }

  getInstructorById(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(this.baseURL + '/' + id);
  }

  getInstructorsByMajor(major: string): Observable<InstructorInfo[]> {
    return this.http.get<InstructorInfo[]>(this.baseURL + '/major/' + major);
  }

  updateInstructor(id: string, newData: FormData): void {
    this.http.patch(this.baseURL + '/' + id, newData).subscribe();
  }

  addInstructor(newData: FormData): void {
    this.http
      .post<Instructor>(this.baseURL, newData)
      .subscribe((instructor: Instructor) => {});
  }

  deleteInstructor(id: number): void {
    this.http.delete(this.baseURL + '/' + id).subscribe();
  }
}
