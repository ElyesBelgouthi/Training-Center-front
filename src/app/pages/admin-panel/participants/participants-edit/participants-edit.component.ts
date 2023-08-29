import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageService } from 'src/app/services/images.service';

import { ParticipantsService } from 'src/app/services/participants.service';

import { fileValidator } from 'src/app/shared/file.validator';
import { Participant } from 'src/app/shared/participant.model';

@Component({
  selector: 'app-participants-edit',
  templateUrl: './participants-edit.component.html',
  styleUrls: ['./participants-edit.component.css'],
})
export class ParticipantsEditComponent implements OnInit {
  participantForm!: FormGroup;
  selectedFileName: string = 'choose a picture';
  editMode!: boolean;
  id!: string;
  imageSrc!: any;
  participant!: Participant;
  previewImage!: any;

  highestEducationLevels: string[] = [
    'PhD',
    'Master',
    'Bachelor',
    'Diploma',
    'High School',
  ];

  majors: string[] = [
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

  jobTitles: string[] = [
    'Software Engineer',
    'Data Analyst',
    'Project Manager',
    'Marketing Coordinator',
    'Sales Representative',
    'Human Resources Specialist',
    'Financial Analyst',
    'Graphic Designer',
    'Customer Service Representative',
    'Accountant',
    'Product Manager',
    'Nurse',
    'Teacher',
    'Electrician',
    'Administrative Assistant',
    'Web Developer',
    'Content Writer',
    'Research Scientist',
    'Operations Manager',
    'Chef',
    'Mechanic',
    'Architect',
    'Lawyer',
    'Social Media Manager',
    'Pharmacist',
  ];

  employeeDepartments: string[] = [
    'Human Resources',
    'Finance',
    'Marketing',
    'Sales',
    'Operations',
    'IT',
    'Engineering',
    'Research and Development',
    'Customer Support',
    'Legal',
    'Administration',
  ];

  occupations: string[] = ['Student', 'employee', 'unemployed'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private participantsService: ParticipantsService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
    });
    if (this.editMode) {
      this.participantsService
        .getParticipantById(this.id)
        .subscribe((participant: Participant) => {
          this.participant = participant;
          this.initForm();
        });
      this.imageService.getImage(this.id, 'participant').subscribe(
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
    this.participantForm = new FormGroup({
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
      occupation: new FormControl('', [Validators.required]),
      jobTitle: new FormControl(''),
      companyName: new FormControl(''),
      employeeDepartment: new FormControl(''),
    });

    if (this.editMode && this.participant) {
      this.participantForm.patchValue({
        firstName: this.participant.firstName,
        lastName: this.participant.lastName,
        age: this.participant.age,
        gender: this.participant.gender,
        address: this.participant.address,
        CIN: this.participant.CIN,
        phoneNumber: this.participant.phoneNumber,
        email: this.participant.email,
        highestEducationLevel: this.participant.highestEducationLevel,
        educationalInstitution: this.participant.educationalInstitution,
        major: this.participant.major,
        city: this.participant.city,
        profilePicture: this.participant.profilePicture,
        occupation: this.participant.occupation,
        jobTitle: this.participant.jobTitle,
        companyName: this.participant.companyName,
        employeeDepartment: this.participant.employeeDepartment,
      });
    }
  }
  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFileName = selectedFile.name;
      if (this.participantForm.get('profilePicture')?.invalid) {
        return;
      }
      this.participantForm.patchValue({
        profilePicture: selectedFile,
      });
      this.previewImage = URL.createObjectURL(selectedFile);
    } else {
      this.selectedFileName = 'choose a picture';
      this.participantForm.patchValue({
        profilePicture: null,
      });
    }
  }

  onSubmit() {
    if (this.participantForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.participantForm.value.firstName);
      formData.append('lastName', this.participantForm.value.lastName);
      formData.append('age', this.participantForm.value.age);
      formData.append('gender', this.participantForm.value.gender);
      formData.append('address', this.participantForm.value.address);
      formData.append('CIN', this.participantForm.value.CIN);
      formData.append('phoneNumber', this.participantForm.value.phoneNumber);
      formData.append('email', this.participantForm.value.email);
      formData.append(
        'highestEducationLevel',
        this.participantForm.value.highestEducationLevel
      );
      formData.append(
        'educationalInstitution',
        this.participantForm.value.educationalInstitution
      );
      formData.append('major', this.participantForm.value.major);
      formData.append('city', this.participantForm.value.city);
      formData.append('occupation', this.participantForm.value.occupation);
      formData.append('jobTitle', this.participantForm.value.jobTitle);
      formData.append('companyName', this.participantForm.value.companyName);
      formData.append(
        'employeeDepartment',
        this.participantForm.value.employeeDepartment
      );

      if (this.participantForm.value.profilePicture instanceof File) {
        formData.append(
          'profilePicture',
          this.participantForm.value.profilePicture
        );
      }
      if (this.editMode) {
        this.participantsService.updateParticipant(this.id, formData);
      } else {
        this.participantsService.addParticipant(formData);
      }
      this.router.navigate(['admin', 'participants']);
    }
  }

  onCancel() {
    this.participantForm.reset();
    this.selectedFileName = 'choose a picture';
    this.router.navigate(['admin', 'participants']);
  }
}
