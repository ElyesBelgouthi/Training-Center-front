import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageService } from 'src/app/services/images.service';
import { InstructorsService } from 'src/app/services/instructors.service';
import { Instructor } from 'src/app/shared/Instructor.model';
import { fileValidator } from 'src/app/shared/file.validator';

@Component({
  selector: 'app-instructors-edit',
  templateUrl: './instructors-edit.component.html',
  styleUrls: ['./instructors-edit.component.css'],
})
export class InstructorsEditComponent implements OnInit {
  instructorForm!: FormGroup;
  selectedFileName: string = 'choose a picture';
  editMode!: boolean;
  id!: number;
  imageSrc!: any;

  highestEducationLevels = [
    'PhD',
    'Master',
    'Bachelor',
    'Diploma',
    'High School',
  ];

  majors = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Psychology',
    'Biology',
    'Art History',
  ];

  nationalities = [
    'American',
    'Canadian',
    'British',
    'Australian',
    'German',
    'French',
    'Japanese',
    'Chinese',
    'Indian',
    // Add more nationality options here
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instructorsService: InstructorsService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] !== undefined;
      this.initForm();
    });
    this.imageService.getImage(1).subscribe(
      (imageData) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target?.result;
        };
        reader.readAsDataURL(imageData);
      },
      (error) => {
        console.error('Error fetching image', error);
      }
    );
  }

  private initForm() {
    let firstName = '';
    let lastName = '';
    let age = '18';
    let gender = 'male';
    let address = '';
    let CIN = '';
    let phoneNumber = '';
    let email = '';
    let highestEducationLevel = '';
    let educationalInstitution = '';
    let major = '';
    let nationality = '';
    let profilePicture = null;
    if (this.editMode) {
      const instructor: Instructor = this.instructorsService.getInstructorById(
        this.id
      );
      firstName = instructor.firstName;
      lastName = instructor.lastName;
      age = instructor.age;
      gender = instructor.gender;
      address = instructor.address;
      CIN = instructor.CIN;
      phoneNumber = instructor.phoneNumber;
      email = instructor.email;
      highestEducationLevel = instructor.highestEducationLevel;
      educationalInstitution = instructor.educationalInstitution;
      major = instructor.major;
      nationality = instructor.nationality;
      profilePicture = instructor.profilePicture;
    }

    this.instructorForm = new FormGroup({
      firstName: new FormControl(firstName, [Validators.required]),
      lastName: new FormControl(lastName, [Validators.required]),
      age: new FormControl(age, [Validators.required]),
      gender: new FormControl(gender, [Validators.required]),
      address: new FormControl(address, [Validators.required]),
      CIN: new FormControl(CIN, [Validators.required]),
      phoneNumber: new FormControl(phoneNumber, [Validators.required]),
      email: new FormControl(email, [Validators.required, Validators.email]),
      highestEducationLevel: new FormControl(highestEducationLevel, [
        Validators.required,
      ]),
      educationalInstitution: new FormControl(educationalInstitution, [
        Validators.required,
      ]),
      major: new FormControl(major, [Validators.required]),
      nationality: new FormControl(nationality, [Validators.required]),
      profilePicture: new FormControl(profilePicture, [
        Validators.required,
        fileValidator,
      ]),
    });
  }

  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFileName = selectedFile.name;
      this.instructorForm.patchValue({
        profilePicture: selectedFile,
      });
    } else {
      this.selectedFileName = 'choose a picture';
      this.instructorForm.patchValue({
        profilePicture: null,
      });
    }
  }

  // onFileNameChange(event: any) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.selectedFileName = inputElement.files[0].name;
  //   } else {
  //     this.selectedFileName = 'choose a picture';
  //   }
  // }

  onSubmit() {
    //  console.log(this.instructorForm);
    const formData = new FormData();

    if (this.instructorForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.instructorForm.value.firstName);
      formData.append('lastName', this.instructorForm.value.lastName);
      formData.append('age', this.instructorForm.value.age);
      formData.append('gender', this.instructorForm.value.gender);
      formData.append('address', this.instructorForm.value.address);
      formData.append('CIN', this.instructorForm.value.CIN);
      formData.append('phoneNumber', this.instructorForm.value.phoneNumber);
      formData.append('email', this.instructorForm.value.email);
      formData.append(
        'highestEducationLevel',
        this.instructorForm.value.highestEducationLevel
      );
      formData.append(
        'educationalInstitution',
        this.instructorForm.value.educationalInstitution
      );
      formData.append('major', this.instructorForm.value.major);
      formData.append('nationality', this.instructorForm.value.nationality);

      if (this.instructorForm.value.profilePicture instanceof File) {
        formData.append(
          'profilePicture',
          this.instructorForm.value.profilePicture
        );
      }
      if (this.editMode) {
        this.instructorsService.updateInstructor(
          this.id,
          this.instructorForm.value
        );
      } else {
        this.instructorsService.addInstructor(formData);
      }
      this.router.navigate(['admin', 'instructors']);
    }
  }

  onCancel() {
    this.instructorForm.reset();
    this.selectedFileName = 'choose a picture';
    this.router.navigate(['admin', 'instructors']);
  }
}
