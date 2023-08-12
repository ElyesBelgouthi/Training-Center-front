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
  // instructors: Instructor[] = [
  //   {
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     age: '30',
  //     gender: 'male',
  //     address: '123 Main St, City',
  //     CIN: '123456789',
  //     phoneNumber: '123-456-7890',
  //     email: 'john@example.com',
  //     highestEducationLevel: 'PhD',
  //     educationalInstitution: 'University of XYZ',
  //     major: 'Computer Science',
  //     nationality: 'American',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     age: '28',
  //     gender: 'female',
  //     address: '456 Elm St, Town',
  //     CIN: '987654321',
  //     phoneNumber: '987-654-3210',
  //     email: 'jane@example.com',
  //     highestEducationLevel: 'Master',
  //     educationalInstitution: 'ABC University',
  //     major: 'Business Administration',
  //     nationality: 'Canadian',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Michael',
  //     lastName: 'Johnson',
  //     age: '35',
  //     gender: 'male',
  //     address: '789 Oak St, Village',
  //     CIN: '543216789',
  //     phoneNumber: '555-123-4567',
  //     email: 'michael@example.com',
  //     highestEducationLevel: 'Bachelor',
  //     educationalInstitution: 'DEF College',
  //     major: 'Engineering',
  //     nationality: 'British',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Emily',
  //     lastName: 'Williams',
  //     age: '26',
  //     gender: 'female',
  //     address: '567 Pine St, Suburb',
  //     CIN: '876543210',
  //     phoneNumber: '777-987-6543',
  //     email: 'emily@example.com',
  //     highestEducationLevel: 'PhD',
  //     educationalInstitution: 'University of ABC',
  //     major: 'Psychology',
  //     nationality: 'Australian',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Robert',
  //     lastName: 'Miller',
  //     age: '29',
  //     gender: 'male',
  //     address: '234 Maple St, Hamlet',
  //     CIN: '987612345',
  //     phoneNumber: '888-123-4567',
  //     email: 'robert@example.com',
  //     highestEducationLevel: 'Diploma',
  //     educationalInstitution: 'GHI Institute',
  //     major: 'Biology',
  //     nationality: 'German',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Sophia',
  //     lastName: 'Martinez',
  //     age: '31',
  //     gender: 'female',
  //     address: '678 Birch St, City',
  //     CIN: '123459876',
  //     phoneNumber: '666-987-1234',
  //     email: 'sophia@example.com',
  //     highestEducationLevel: 'Master',
  //     educationalInstitution: 'JKL University',
  //     major: 'Art History',
  //     nationality: 'French',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'William',
  //     lastName: 'Davis',
  //     age: '32',
  //     gender: 'male',
  //     address: '890 Cedar St, Town',
  //     CIN: '543210987',
  //     phoneNumber: '555-987-6543',
  //     email: 'william@example.com',
  //     highestEducationLevel: 'PhD',
  //     educationalInstitution: 'MNO College',
  //     major: 'Computer Science',
  //     nationality: 'Japanese',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Olivia',
  //     lastName: 'Taylor',
  //     age: '27',
  //     gender: 'female',
  //     address: '456 Elm St, Suburb',
  //     CIN: '876543219',
  //     phoneNumber: '777-987-1234',
  //     email: 'olivia@example.com',
  //     highestEducationLevel: 'Master',
  //     educationalInstitution: 'PQR University',
  //     major: 'Business Administration',
  //     nationality: 'Chinese',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Ethan',
  //     lastName: 'Anderson',
  //     age: '34',
  //     gender: 'male',
  //     address: '789 Oak St, Village',
  //     CIN: '432198765',
  //     phoneNumber: '888-987-4321',
  //     email: 'ethan@example.com',
  //     highestEducationLevel: 'Bachelor',
  //     educationalInstitution: 'STU College',
  //     major: 'Engineering',
  //     nationality: 'Indian',
  //     profilePicture: null,
  //   },
  //   {
  //     firstName: 'Ava',
  //     lastName: 'Moore',
  //     age: '25',
  //     gender: 'female',
  //     address: '234 Maple St, Hamlet',
  //     CIN: '765432198',
  //     phoneNumber: '555-123-9876',
  //     email: 'ava@example.com',
  //     highestEducationLevel: 'Diploma',
  //     educationalInstitution: 'VWX Institute',
  //     major: 'Psychology',
  //     nationality: 'Australian',
  //     profilePicture: null,
  //   },
  // ];

  baseURL: string = `http://localhost:3000/instructor`;

  constructor(private http: HttpClient) {}

  getInstructors(): Observable<Instructor[]> {
    return this.http.get<Instructor[]>(this.baseURL);
  }

  getInstructorById(id: number): Instructor {
    return this.instructors[id];
  }

  updateInstructor(id: number, newData: Instructor): void {
    this.instructors[id] = newData;
    this.instructorsChanged.emit(this.instructors.slice());
  }

  addInstructor(newData: FormData): void {
    this.http
      .post<Instructor>(this.baseURL, newData)
      .subscribe((instructor: Instructor) => {
        console.log(instructor);
        this.instructors.push(instructor);
        this.instructorsChanged.emit(this.instructors.slice());
      });
  }

  deleteInstructor(id: number): void {
    this.instructors.splice(id, 1);
    this.instructorsChanged.emit(this.instructors.slice());
  }
}
