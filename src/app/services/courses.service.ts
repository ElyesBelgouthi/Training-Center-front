import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../shared/course.model';
import { formatCurrency } from '@angular/common';
import { Material } from '../shared/material.model';
import { Participant } from '../shared/participant.model';

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

  addMaterial(data: FormData, id: number): Observable<Material> {
    return this.http.post<Material>(this.baseURL + '/material/' + id, data);
  }

  downloadMaterial(id: number) {
    return this.http.get(this.baseURL + '/file/' + id, {
      responseType: 'blob',
    });
  }

  getMaterials(id: number) {
    return this.http.get<Material[]>(this.baseURL + '/material/' + id);
  }

  removeMaterial(materialId: number): void {
    this.http.delete(this.baseURL + '/material/' + materialId).subscribe();
  }

  addParticipantToCourse(
    courseId: number,
    participantId: number
  ): Observable<Participant> {
    return this.http.post<Participant>(
      `${this.baseURL}/${courseId}/participant/${participantId}`,
      {}
    );
  }

  getParticipantsForCourse(courseId: number): Observable<Participant[]> {
    return this.http.get<Participant[]>(
      `${this.baseURL}/${courseId}/participant`
    );
  }

  deleteParticipantsForCourse(courseId: number, participantId: number): void {
    this.http
      .delete(`${this.baseURL}/${courseId}/participant/${participantId}`)
      .subscribe();
  }
}
