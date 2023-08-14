import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../shared/course.model';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  baseURL: string = `http://localhost:3000/course`;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseURL);
  }

  getCourseById(id: string): Observable<Course> {
    return this.http.get<Course>(this.baseURL + '/' + id);
  }

  updateCourse(id: string, newData: any): void {
    this.http.patch(this.baseURL + '/' + id, newData).subscribe();
  }

  addCourse(newData: any): void {
    this.http
      .post<Course>(this.baseURL, newData)
      .subscribe((course: Course) => {});
  }

  deleteCourse(id: number): void {
    this.http.delete(this.baseURL + '/' + id).subscribe();
  }
}
