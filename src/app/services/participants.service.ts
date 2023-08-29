import { Injectable } from '@angular/core';
import { Instructor } from '../shared/Instructor.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Participant } from '../shared/participant.model';

@Injectable({ providedIn: 'root' })
export class ParticipantsService {
  baseURL: string = `http://localhost:3000/participant`;

  constructor(private http: HttpClient) {}

  getParticipants(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.baseURL);
  }

  getParticipantById(id: string): Observable<Participant> {
    return this.http.get<Participant>(this.baseURL + '/' + id);
  }

  updateParticipant(id: string, newData: FormData): void {
    this.http.patch(this.baseURL + '/' + id, newData).subscribe();
  }

  addParticipant(newData: FormData): void {
    this.http
      .post<Participant>(this.baseURL, newData)
      .subscribe((participant: Participant) => {});
  }

  deleteParticipant(id: number): void {
    this.http.delete(this.baseURL + '/' + id).subscribe();
  }
}
