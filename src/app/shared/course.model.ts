import { Instructor } from './Instructor.model';

export class Course {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public category: string,
    public duration: string,
    public startDate: Date,
    public endDate: Date,
    public maxParticipants: number,
    public prerequisites: string,
    public materials: any,
    public registrationFee: number,
    public instructorSalary: number,
    public instructorId: number
  ) {}
}
