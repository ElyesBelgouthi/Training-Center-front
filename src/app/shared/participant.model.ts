export class Participant {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public age: string,
    public gender: string,
    public address: string,
    public CIN: string,
    public phoneNumber: string,
    public email: string,
    public highestEducationLevel: string,
    public educationalInstitution: string,
    public major: string,
    public city: string,
    public profilePicture: any,
    public occupation: string,
    public jobTitle?: string,
    public companyName?: string,
    public employeeDepartment?: string,
    public courses?: any
  ) {}
}
