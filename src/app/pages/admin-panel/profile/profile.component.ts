import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageService } from 'src/app/services/images.service';
import { fileValidator } from 'src/app/shared/file.validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  adminForm!: FormGroup;
  id!: string;
  imageSrc!: any;
  admin!: any;
  previewImage!: any;

  selectedFileName: string = 'choose a picture';

  constructor(
    private authenticationService: AuthenticationService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.authenticationService.getAdmin().subscribe((admin: any) => {
      this.admin = admin;
      this.formInit();
    });
    this.imageService.getImage('1', 'auth').subscribe(
      (imageData) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target?.result;
        };
        reader.readAsDataURL(imageData);
      },
      (error) => {}
    );
  }

  private formInit(): void {
    this.adminForm = new FormGroup({
      firstName: new FormControl(this.admin.firstName, [Validators.required]),
      lastName: new FormControl(this.admin.lastName, [Validators.required]),
      username: new FormControl(this.admin.username, [Validators.required]),
      email: new FormControl(this.admin.email, [
        Validators.required,
        Validators.email,
      ]),
      age: new FormControl(this.admin.age, [Validators.required]),
      phoneNumber: new FormControl(this.admin.phoneNumber, [
        Validators.required,
      ]),
      profilePicture: new FormControl(
        this.admin.profilePicture,
        fileValidator.bind(this)
      ),
    });
  }

  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFileName = selectedFile.name;
      if (this.adminForm.get('profilePicture')?.invalid) {
        return;
      }
      this.adminForm.patchValue({
        profilePicture: selectedFile,
      });
      this.previewImage = URL.createObjectURL(selectedFile);
    } else {
      this.selectedFileName = 'choose a picture';
      this.adminForm.patchValue({
        profilePicture: null,
      });
    }
  }
  onSubmit() {
    if (this.adminForm.valid) {
      const formData = new FormData();
      formData.append('firstName', this.adminForm.value.firstName);
      formData.append('lastName', this.adminForm.value.lastName);
      formData.append('age', this.adminForm.value.age);
      // formData.append('username', this.adminForm.value.username);
      // formData.append('email', this.adminForm.value.email);
      formData.append('phoneNumber', this.adminForm.value.phoneNumber);
      if (this.adminForm.value.profilePicture instanceof File) {
        formData.append('profilePicture', this.adminForm.value.profilePicture);
      }
      this.authenticationService.updateAdmin(formData);
    }
  }

  onReset() {
    this.formInit();
    this.selectedFileName = 'choose a picture';
  }
}
