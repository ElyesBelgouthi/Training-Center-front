import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  admin = {
    firstName: 'admin',
    lastName: 'admin',
    username: 'admin',
    email: 'admin@admin',
    password: 'admin',
    age: 21,
    phoneNumber: 98989989,
    profilePicture: null,
  };

  adminForm!: FormGroup;

  selectedFileName: string = 'choose';

  ngOnInit(): void {
    this.formInit();
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
        this.fileValidator
      ),
    });
  }

  fileValidator(control: any): { [message: string]: boolean } | null {
    const file = control.value;
    if (file) {
      const fileExt = file.name.split('.').pop().toLowerCase();
      const allowedExtensions = ['png', 'jpeg', 'jpg', 'gif', 'svg'];
      if (!allowedExtensions.includes(fileExt)) {
        return { invalidFileType: true };
      }
      const maxSize = 10 * 1024 * 1024;
      if (file.size > maxSize) {
        return { sizeExceeded: true };
      }
    }
    return null;
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedFileName = inputElement.files[0].name;
    } else {
      this.selectedFileName = 'Choose a ';
    }
  }
}
