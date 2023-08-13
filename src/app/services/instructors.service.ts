import { EventEmitter, Injectable } from '@angular/core';
import { Instructor } from '../shared/Instructor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InstructorsService {
  instructorsChanged: EventEmitter<Instructor[]> = new EventEmitter<
    Instructor[]
  >();
  instructors!: Instructor[];

  baseURL: string = `http://localhost:3000/instructor`;

  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseURL);
  }

  getInstructorById(id: string): Observable<Instructor> {
    return this.http.get<Instructor>(this.baseURL + '/' + id);
  }

  // updateInstructor(id: number, newData: Instructor): void {
  //   this.instructors[id] = newData;
  //   this.instructorsChanged.emit(this.instructors.slice());
  // }

  addInstructor(newData: FormData): void {
    this.http
      .post<Instructor>(this.baseURL, newData)
      .subscribe((instructor: Instructor) => {});
  }

  deleteInstructor(id: number): void {
    this.http.delete(this.baseURL + '/' + id).subscribe();
  }
}
