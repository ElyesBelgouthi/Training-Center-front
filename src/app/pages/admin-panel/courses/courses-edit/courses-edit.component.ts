import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { InstructorsService } from 'src/app/services/instructors.service';
import { Instructor } from 'src/app/shared/Instructor.model';
import { Course } from 'src/app/shared/course.model';
import { InstructorInfo } from 'src/app/shared/instructor-info.model';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css'],
})
export class CoursesEditComponent implements OnInit {
  courseForm!: FormGroup;
  selectedFileName: string = 'choose a file';
  editMode!: boolean;
  id!: string;
  course!: Course;
  selectedCategory!: boolean;
  instructors!: Instructor[];

  durations = [
    '2 days',
    '3 days',
    '1 week',
    '2 weeks',
    '1 month',
    '2 months',
    '6 months',
    '1 year',
    '3 years',
  ];

  categories = [
    'Computer Science',
    'Engineering',
    'Business Administration',
    'Psychology',
    'Biology',
    'Art History',
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private coursesService: CoursesService,
    private instructorsService: InstructorsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
    });
    if (this.editMode) {
      this.coursesService.getCourseById(this.id).subscribe((course: Course) => {
        this.course = course;
        this.initForm();
        this.instructorsService
          .getInstructorsByMajor(this.course.category)
          .subscribe((instructors: Instructor[]) => {
            this.instructors = instructors;
            this.selectedCategory = true;
          });
      });
    } else {
      this.initForm();
    }
  }

  private initForm() {
    this.courseForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      maxParticipants: new FormControl('', [
        Validators.required,
        Validators.min(1),
      ]),
      prerequisites: new FormControl(''),
      materials: new FormControl(null),
      registrationFee: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      instructorSalary: new FormControl('', [
        Validators.required,
        Validators.min(0),
      ]),
      instructorId: new FormControl('', [Validators.required]),
    });

    if (this.editMode && this.course) {
      this.courseForm.patchValue({
        id: this.course.id,
        title: this.course.title,
        description: this.course.description,
        category: this.course.category,
        duration: this.course.duration,
        startDate: this.course.startDate,
        endDate: this.course.endDate,
        maxParticipants: this.course.maxParticipants,
        prerequisites: this.course.prerequisites,
        registrationFee: this.course.registrationFee,
        instructorSalary: this.course.instructorSalary,
        instructorId: this.course.instructor.id,
      });
    }
  }
  onFileChange(event: any) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const selectedFile = inputElement.files[0];
      this.selectedFileName = selectedFile.name;
      this.courseForm.patchValue({
        materials: selectedFile,
      });
    } else {
      this.selectedFileName = 'choose a picture';
      this.courseForm.patchValue({
        materials: null,
      });
    }
  }

  onSubmit() {
    if (this.courseForm.valid) {
      const courseData = {
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        category: this.courseForm.value.category,
        duration: this.courseForm.value.duration,
        startDate: this.courseForm.value.startDate,
        endDate: this.courseForm.value.endDate,
        maxParticipants: this.courseForm.value.maxParticipants,
        prerequisites: this.courseForm.value.prerequisites,
        registrationFee: this.courseForm.value.registrationFee,
        instructorSalary: this.courseForm.value.instructorSalary,
        instructorId: +this.courseForm.value.instructorId,
      };

      // if (this.courseForm.value.materials instanceof File) {
      //   // Assuming you have a 'materials' property in your DTO
      //   courseData['materials'] = this.courseForm.value.materials;
      // }

      if (this.editMode) {
        this.coursesService.updateCourse(this.id, courseData);
      } else {
        this.coursesService.addCourse(courseData);
      }

      this.router.navigate(['admin', 'courses']);
    }
  }

  onCancel() {
    this.courseForm.reset();
    this.selectedFileName = 'choose a picture';
    this.router.navigate(['admin', 'courses']);
  }

  onCategoryChange(event: any) {
    this.instructorsService
      .getInstructorsByMajor(event.target.value)
      .subscribe((instructors: Instructor[]) => {
        if (instructors.length > 0) {
          this.instructors = instructors;
          this.selectedCategory = true;
        } else {
          this.selectedCategory = false;
        }
      });
  }
  onAddMaterials() {
    this.router.navigate(['materials'], { relativeTo: this.route });
  }
}
