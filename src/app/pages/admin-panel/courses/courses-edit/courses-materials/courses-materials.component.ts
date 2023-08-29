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
import { Material } from 'src/app/shared/material.model';

@Component({
  selector: 'app-courses-materials',
  templateUrl: './courses-materials.component.html',
  styleUrls: ['./courses-materials.component.css'],
})
export class CoursesMaterialsComponent implements OnInit {
  materialForm!: FormGroup;
  selectedFiles: File[] = [];
  id!: number;
  courseMaterials!: Material[];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.coursesService
        .getMaterials(this.id)
        .subscribe((materials: Material[]) => {
          console.log(materials);
          this.courseMaterials = materials;
        });
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
    for (let i = 0; i < this.selectedFiles.length; i++) {
      const formData = new FormData();
      formData.append('material', this.selectedFiles[i]);
      this.coursesService
        .addMaterial(formData, this.id)
        .subscribe((material: Material) => {
          this.courseMaterials.push(material);
        });
    }
    this.selectedFiles = [];
  }

  removeFile(index: number) {
    this.selectedFiles.splice(index, 1);
  }

  downloadMaterial(id: number) {
    this.coursesService.downloadMaterial(id).subscribe((data: Blob) => {
      const fileUrl = window.URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = 'Material_' + id;
      link.click();

      window.URL.revokeObjectURL(fileUrl);
    });
  }

  deleteMaterial(materialId: number, index: number) {
    this.coursesService.removeMaterial(materialId);
    this.courseMaterials.splice(index, 1);
  }
}
