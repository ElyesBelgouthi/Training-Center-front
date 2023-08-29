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
  previewImage!: any;

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

  cities: string[] = [
    'Tunis',
    'Ariana',
    'Ben Arous',
    'Manouba',
    'Nabeul',
    'Zaghouan',
    'Bizerte',
    'Béja',
    'Jendouba',
    'Le Kef',
    'Siliana',
    'Kairouan',
    'Kasserine',
    'Sidi Bouzid',
    'Sousse',
    'Monastir',
    'Mahdia',
    'Sfax',
    'Gafsa',
    'Tozeur',
    'Kébili',
    'Gabès',
    'Medenine',
    'Tataouine',
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
      this.imageService.getImage(this.id, 'instructor').subscribe(
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
      age: new FormControl('18', [
        Validators.required,
        Validators.min(18),
        Validators.max(100),
      ]),
      gender: new FormControl('male', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      CIN: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
      phoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^(\(\+216\))?\d{8}$/),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      ]),
      highestEducationLevel: new FormControl('', [Validators.required]),
      educationalInstitution: new FormControl('', [Validators.required]),
      major: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
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
        city: this.instructor.city,
        profilePicture: this.instructor.profilePicture,
      });
    }
  }
  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFileName = selectedFile.name;
      if (this.instructorForm.get('profilePicture')?.invalid) {
        return;
      }
      this.instructorForm.patchValue({
        profilePicture: selectedFile,
      });
      this.previewImage = URL.createObjectURL(selectedFile);
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
      formData.append('city', this.instructorForm.value.city);

      if (this.instructorForm.value.profilePicture instanceof File) {
        formData.append(
          'profilePicture',
          this.instructorForm.value.profilePicture
        );
      }
      if (this.editMode) {
        this.instructorsService.updateInstructor(this.id, formData);
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
