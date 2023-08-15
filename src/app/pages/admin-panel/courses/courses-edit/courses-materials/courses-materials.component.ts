import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { documentValidator } from 'src/app/shared/document.validator';

@Component({
  selector: 'app-courses-materials',
  templateUrl: './courses-materials.component.html',
  styleUrls: ['./courses-materials.component.css'],
})
export class CoursesMaterialsComponent implements OnInit {
  materialForm!: FormGroup;
  selectedFiles: File[] = [];
  id!: number;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.materialForm = new FormGroup({
      file: new FormControl(null, documentValidator),
    });
  }

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const newFile = inputElement.files[0];

      this.materialForm.patchValue({
        file: newFile,
      });
      if (this.materialForm.get('file')?.invalid) {
        return;
      }

      this.selectedFiles.push(newFile);
    }
  }

  uploadMaterials(): void {
    const formData = new FormData();

    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('materials', this.selectedFiles[i]);
    }
    console.log(formData);
    this.coursesService.addMaterials(formData, this.id).subscribe(() => {
      console.log('Materials uploaded successfully');
    });
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }
}
