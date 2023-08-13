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
  id!: string;
  imageSrc!: any;
  instructor!: Instructor;

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
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
    });
    if (this.editMode) {
      this.instructorsService
        .getInstructorById(this.id)
        .subscribe((instructor: Instructor) => {
          this.instructor = instructor;
          this.initForm();
        });
      this.imageService.getImage(this.id).subscribe(
        (imageData) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imageSrc = e.target?.result;
          };
          reader.readAsDataURL(imageData);
        },
        (error) => {}
      );
    } else {
      this.initForm();
    }
  }

  private initForm() {
    this.instructorForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('18', [Validators.required]),
      gender: new FormControl('male', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      CIN: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      highestEducationLevel: new FormControl('', [Validators.required]),
      educationalInstitution: new FormControl('', [Validators.required]),
      major: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      profilePicture: new FormControl(null, [fileValidator]),
    });

    if (this.editMode && this.instructor) {
      this.instructorForm.patchValue({
        firstName: this.instructor.firstName,
        lastName: this.instructor.lastName,
        age: this.instructor.age,
        gender: this.instructor.gender,
        address: this.instructor.address,
        CIN: this.instructor.CIN,
        phoneNumber: this.instructor.phoneNumber,
        email: this.instructor.email,
        highestEducationLevel: this.instructor.highestEducationLevel,
        educationalInstitution: this.instructor.educationalInstitution,
        major: this.instructor.major,
        nationality: this.instructor.nationality,
        profilePicture: this.instructor.profilePicture,
      });
    }
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
        console.log(formData);
        // this.instructorsService.updateInstructor(
        //   this.id,
        //   this.instructorForm.value
        // );
      } else {
        console.log(formData);
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
